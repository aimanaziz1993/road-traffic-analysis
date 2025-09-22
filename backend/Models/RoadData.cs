using CsvHelper.Configuration.Attributes;

namespace backend.Models;

public class RoadData
{
    [Name("id")]
    public string Id { get; set; }

    [Name("road_name")]
    public string RoadName { get; set; }

    [Name("city")]
    public string City { get; set; }

    [Name("road_type")]
    public string RoadType { get; set; }

    [Name("lanes")]
    public int Lanes { get; set; }

    [Name("speed_kph")]
    public int SpeedKph { get; set; }

    [Name("traffic_index")]
    public double TrafficIndex { get; set; }

    [Name("direction")]
    public string Direction { get; set; }

    [Name("wkt")]
    public string Wkt { get; set; }
}