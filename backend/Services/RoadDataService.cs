using System.Text.Json;
using backend.Models.DataSource; // Using the source models

namespace backend.Services;

// This internal model combines properties and geometry for easier processing.
public record RoadFeature(RoadProperties Properties, Geometry Geometry);

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
            var featureCollection = JsonSerializer.Deserialize<FeatureCollection>(jsonString);

            // We store the data in a clean, combined record format internally.
            _roadFeatures = featureCollection.Features
                .Select(f => new RoadFeature(f.Properties, f.Geometry))
                .ToList();
        }
        catch (JsonException ex)
        {
            // This is a critical startup error. We wrap it in a more specific exception.
            throw new InvalidOperationException("Failed to parse the GeoJSON data source. Check for syntax errors.", ex);
        }
    }

    // The public method returns the internal data for the controller to use.
    public IEnumerable<RoadFeature> GetAllRoadFeatures()
    {
        return _roadFeatures;
    }
}