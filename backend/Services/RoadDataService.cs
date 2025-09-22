using System.Text.Json;
using NetTopologySuite.IO;
using NetTopologySuite.Geometries;
using backend.Models.DataSource;
using NetTopologySuite.Features;

namespace backend.Services;

public record RoadFeature(RoadProperties Properties, NetTopologySuite.Geometries.Geometry Geometry);

public class RoadDataService
{
    private readonly List<RoadFeature> _roadFeatures;

    public RoadDataService()
    {
        try
        {
            var filePath = Path.Combine(AppContext.BaseDirectory, "Data", "selangor_roads_mock.geojson");
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException("The road data source 'selangor_roads_mock.geojson' was not found.");
            }

            var jsonString = File.ReadAllText(filePath);
            
            var reader = new GeoJsonReader();
            var featureCollection = reader.Read<FeatureCollection>(jsonString);

            // 3. Transform into our internal, easy-to-use RoadFeature record
            _roadFeatures = featureCollection.Select(f =>
            {
                var attributes = f.Attributes;
                // The geometry is now a real NetTopologySuite.Geometry object.
                // We just need to map the attributes to our RoadProperties class.
                var properties = new RoadProperties
                {
                    Id = attributes.GetOptionalValue("id")?.ToString() ?? string.Empty,
                    RoadName = attributes.GetOptionalValue("road_name")?.ToString() ?? "Unnamed Road",
                    City = attributes.GetOptionalValue("city")?.ToString() ?? "Unknown City",
                    RoadType = attributes.GetOptionalValue("road_type")?.ToString() ?? "secondary",
                    Lanes = Convert.ToInt32(attributes.GetOptionalValue("lanes") ?? 0),
                    SpeedKph = Convert.ToInt32(attributes.GetOptionalValue("speed_kph") ?? 0),
                    TrafficIndex = Convert.ToDouble(attributes.GetOptionalValue("traffic_index") ?? 0.0),
                    Direction = attributes.GetOptionalValue("direction")?.ToString() ?? "two_way"
                };
                return new RoadFeature(properties, f.Geometry);
            }).ToList();
        }
        catch (Exception ex) // Catch a broader range of exceptions during parsing
        {
            throw new InvalidOperationException("Failed to load or parse the GeoJSON data source.", ex);
        }
    }

    // The public method returns the internal data for the controller to use.
    public IEnumerable<RoadFeature> GetAllRoadFeatures()
    {
        return _roadFeatures;
    }
}