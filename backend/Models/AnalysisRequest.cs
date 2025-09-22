using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class AnalysisRequest
{
    public string? City { get; set; }

    // Optional: You could create a custom attribute to validate against a list of known road types.
    public string? RoadType { get; set; }

    [Range(1, 16, ErrorMessage = "Minimum lanes must be between 1 and 16.")]
    public int? MinLanes { get; set; }
}