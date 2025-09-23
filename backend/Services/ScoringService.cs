using backend.Models.DataSource;

namespace backend.Services;

public class ScoringService
{
    // Define weights for the model
    private const double TrafficWeight = 0.40;
    private const double SpeedWeight = 0.30;
    private const double LanesWeight = 0.15;
    private const double DirectionWeight = 0.15;

    public double CalculateLocationPotential(RoadProperties props)
    {
        // 1. Calculate weighted score for individual factors
        double trafficScore = props.TrafficIndex * TrafficWeight;
        double speedScore = CalculateSpeedScore(props.SpeedKph) * SpeedWeight;
        double lanesScore = CalculateLanesScore(props.Lanes) * LanesWeight;
        double directionScore = (props.Direction.Equals("two_way", StringComparison.OrdinalIgnoreCase) ? 1.0 : 0.7) * DirectionWeight;

        // 2. Sum the weighted scores
        double totalWeightedScore = trafficScore + speedScore + lanesScore + directionScore;
        
        // 3. Apply the critical Road Type multiplier
        double roadTypeMultiplier = GetRoadTypeMultiplier(props.RoadType);

        return Math.Round(totalWeightedScore * roadTypeMultiplier, 4);
    }

    // Generates a dynamic reason based on the highest contributing factors
    public string GenerateReason(RoadProperties props, double finalScore)
    {
        string speedReason = props.SpeedKph <= 70 ? "slower, high-visibility traffic" : "steady traffic flow";
        string roadTypeReason = props.RoadType switch
        {
            "secondary" => "an accessible secondary road",
            "primary" => "a primary city artery",
            _ => "a main road"
        };
        return $"Scores {finalScore:F2} due to high traffic on {roadTypeReason} with {speedReason}.";
    }

    private static double GetRoadTypeMultiplier(string roadType) => roadType.ToLower() switch
    {
        "secondary" => 1.2,
        "primary" => 1.0,
        "expressway" => 0.5,
        _ => 0.8
    };

    // Normalizes speed to a 0-1 score where lower is better.
    private static double CalculateSpeedScore(int speedKph)
    {
        if (speedKph <= 50) return 1.0;
        if (speedKph >= 110) return 0.0;
        return 1.0 - ((double)speedKph - 50) / 60.0;
    }

    // Normalizes lanes to a 0-1 score, rewarding more lanes.
    private static double CalculateLanesScore(int lanes)
    {
        // Cap score at 6 lanes
        return Math.Min((double)lanes / 6.0, 1.0);
    }

}