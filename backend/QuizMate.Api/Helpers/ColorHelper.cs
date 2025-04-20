namespace QuizMate.Api.Helpers
{
    public static class ColorHelper
    {
        private static readonly List<string> RandomColorPresets = new()
        {
            "blue",
            "green",
            "purple",
            "red",
            "orange",
            "yellow",
            "lime",
            "teal",
            "indigo",
            "pink",
            "emerald",
            "sky",
            "violet",
            "slate"
        };

        private static readonly Random Random = new();

        public static string GetRandomColorPreset()
        {
            return RandomColorPresets[Random.Next(RandomColorPresets.Count)];
        }
    }
}