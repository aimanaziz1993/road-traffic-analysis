using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Models.ApiContract; // Using our clean contract models
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalysisController : ControllerBase
{
    private readonly RoadDataService _roadDataService;
    private static readonly HashSet<string> ValidRoadTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "expressway", "primary", "secondary"
    };

    public AnalysisController(RoadDataService roadDataService)
    {
        _roadDataService = roadDataService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(IEnumerable<RoadCandidate>), 200)]
    [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
    public IActionResult RunAnalysis([FromBody] AnalysisRequest request)
    {
        // Manual validation for the road type
        if (!string.IsNullOrEmpty(request.RoadType) && !ValidRoadTypes.Contains(request.RoadType))
        {
            ModelState.AddModelError(nameof(request.RoadType), $"Invalid road type. Must be one of: expressway, primary, secondary.");
        }
        
        // This checks for both data annotation validation (MinLanes) and our manual validation
        if (!ModelState.IsValid)
        {
            return BadRequest(new ValidationProblemDetails(ModelState));
        }

        var featuresQuery = _roadDataService.GetAllRoadFeatures().AsQueryable();

        // Filtering logic (now operating on RoadFeature)
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

        // Ranking and transformation to the API contract model
        var topCandidates = featuresQuery
            .OrderByDescending(f => f.Properties.TrafficIndex)
            .Take(10)
            .Select(f => new RoadCandidate
            {
                Id = f.Properties.Id,
                RoadName = f.Properties.RoadName,
                City = f.Properties.City,
                RoadType = f.Properties.RoadType,
                Lanes = f.Properties.Lanes,
                TrafficIndex = f.Properties.TrafficIndex,
                Reason = $"High traffic index of {f.Properties.TrafficIndex} on a {f.Properties.Lanes}-lane {f.Properties.RoadType}.",
                Geometry = new GeometryData
                {
                    Coordinates = f.Geometry.Coordinates
                }
            })
            .ToList();
        
        return Ok(topCandidates);
    }
}