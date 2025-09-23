using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Models.ApiContract;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalysisController : ControllerBase
{
    private readonly RoadDataService _roadDataService;
    private readonly ScoringService _scoringService;
    private static readonly HashSet<string> ValidRoadTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "expressway", "primary", "secondary"
    };

    public AnalysisController(RoadDataService roadDataService, ScoringService scoringService)
    {
        _roadDataService = roadDataService;
        _scoringService = scoringService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(IEnumerable<RoadCandidate>), 200)]
    [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
    public IActionResult RunAnalysis([FromBody] AnalysisRequest request)
    {
        // Validation
        if (!string.IsNullOrEmpty(request.RoadType) && !ValidRoadTypes.Contains(request.RoadType))
        {
            ModelState.AddModelError(nameof(request.RoadType), $"Invalid road type. Must be one of: expressway, primary, secondary.");
        }
        
        if (!ModelState.IsValid)
        {
            return BadRequest(new ValidationProblemDetails(ModelState));
        }

        var featuresQuery = _roadDataService.GetAllRoadFeatures().AsQueryable();

        if (!string.IsNullOrEmpty(request.City))
        {
            featuresQuery = featuresQuery.Where(f => f.Properties.City.Equals(request.City, StringComparison.OrdinalIgnoreCase));
        }
        if (!string.IsNullOrEmpty(request.RoadType))
        {
            featuresQuery = featuresQuery.Where(f => f.Properties.RoadType.Equals(request.RoadType, StringComparison.OrdinalIgnoreCase));
        }
        if (request.MinLanes.HasValue)
        {
            featuresQuery = featuresQuery.Where(f => f.Properties.Lanes >= request.MinLanes.Value);
        }

        var topResults = featuresQuery
            .Select(f => new {
                Feature = f,
                Score = _scoringService.CalculateLocationPotential(f.Properties)
            })
            .OrderByDescending(x => x.Score)
            .Take(10)
            .ToList();

        var candidates = topResults.Select(x =>
            {
                var f = x.Feature;
                var interpolatedCoords = GeospatialHelper.InterpolatePointsAlongLine(f.Geometry, 50.0);

                return new RoadCandidate
                {
                    Id = f.Properties.Id,
                    RoadName = f.Properties.RoadName,
                    City = f.Properties.City,
                    RoadType = f.Properties.RoadType,
                    Lanes = f.Properties.Lanes,
                    TrafficIndex = f.Properties.TrafficIndex,
                    LocationPotentialScore = x.Score,
                    Reason = _scoringService.GenerateReason(f.Properties, x.Score),
                    Geometry = new GeometryData
                    {
                        Coordinates = f.Geometry.Coordinates.Select(c => new List<double> { c.X, c.Y }).ToList()
                    },
                    HeatmapPoints = interpolatedCoords.Select(coord => new List<double>
                    {
                        coord.Y,
                        coord.X,
                        x.Score
                    }).ToList()
                };
            })
            .ToList();
        
        return Ok(candidates);
    }
}