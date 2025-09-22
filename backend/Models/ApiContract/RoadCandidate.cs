namespace backend.Models.ApiContract;

public class RoadCandidate
{
    public string Id { get; set; }
    public string RoadName { get; set; }
    public string City { get; set; }
    public string RoadType { get; set; }
    public int Lanes { get; set; }
    public double TrafficIndex { get; set; }
    public string Reason { get; set; }
    public GeometryData Geometry { get; set; }
}