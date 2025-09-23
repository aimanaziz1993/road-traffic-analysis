using NetTopologySuite.Geometries;

namespace backend.Services;

public static class GeospatialHelper
{
    public static List<Coordinate> InterpolatePointsAlongLine(Geometry geometry, double intervalMeters)
    {
        var points = new List<Coordinate>();
        var line = geometry as LineString;

        if (line == null || line.Length == 0)
        {
            return points;
        }

        points.Add(line.StartPoint.Coordinate);

        const double metersPerDegree = 111139;
        double intervalDegrees = intervalMeters / metersPerDegree;
        double currentDistance = intervalDegrees;

        while (currentDistance < line.Length)
        {
            var pointOnLine = line.GetCoordinateN((int)(currentDistance / line.Length * (line.NumPoints - 1)));
            points.Add(pointOnLine);
            currentDistance += intervalDegrees;
        }

        points.Add(line.EndPoint.Coordinate);
        return points.Distinct().ToList();
    }
}