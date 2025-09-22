using System.Text.Json.Serialization;

namespace backend.Models.GeoJson;

public class FeatureCollection
{
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("features")]
    public List<Feature> Features { get; set; }
}

public class Feature
{
    [JsonPropertyName("type")]
    public string Type { get; set; }

    [JsonPropertyName("properties")]
    public RoadProperties Properties { get; set; }

    [JsonPropertyName("geometry")]
    public Geometry Geometry { get; set; }
}

public class RoadProperties
{
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonPropertyName("road_name")]
    public string RoadName { get; set; }

    [JsonPropertyName("city")]
    public string City { get; set; }

    [JsonPropertyName("road_type")]
    public string RoadType { get; set; }

    [JsonPropertyName("lanes")]
    public int Lanes { get; set; }

    [JsonPropertyName("speed_kph")]
    public int SpeedKph { get; set; }

    [JsonPropertyName("traffic_index")]
    public double TrafficIndex { get; set; }

    [JsonPropertyName("direction")]
    public string Direction { get; set; }
}

public class Geometry
{
    [JsonPropertyName("type")]
    public string Type { get; set; }

    // This will hold the [lng, lat] pairs
    [JsonPropertyName("coordinates")]
    public List<List<double>> Coordinates { get; set; }
}