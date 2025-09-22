namespace backend.Models.ApiContract;

public class RoadCandidate
{
    public required string Id { get; set; }
    public required string RoadName { get; set; }
    public required string City { get; set; }
    public required string RoadType { get; set; }
    public int Lanes { get; set; }
    public double TrafficIndex { get; set; }
    public double LocationPotentialScore { get; set; }
    public required string Reason { get; set; }
    public required GeometryData Geometry { get; set; }
    public required List<List<double>> HeatmapPoints { get; set; }
}