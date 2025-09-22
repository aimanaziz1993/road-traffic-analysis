using System.Text.Json.Serialization;

namespace backend.Models.ApiContract;

public class GeometryData
{
    [JsonPropertyName("type")]
    public string Type { get; set; } = "LineString";

    [JsonPropertyName("coordinates")]
    public List<List<double>> Coordinates { get; set; }
}