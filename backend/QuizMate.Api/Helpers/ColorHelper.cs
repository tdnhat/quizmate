namespace QuizMate.Api.Helpers
{
    public static class ColorHelper
    {
        private static readonly List<string> GradientColors = new()
    {
        "from-blue-500 to-cyan-400",
        "from-green-500 to-emerald-400",
        "from-orange-500 to-amber-400",
        "from-yellow-500 to-amber-400",
        "from-purple-500 to-violet-400",
        "from-red-500 to-rose-400",
        "from-indigo-500 to-blue-400",
        "from-teal-500 to-green-400",
        "from-pink-500 to-fuchsia-400",
        "from-lime-500 to-green-400",
    };

    private static readonly Random Random = new();

    public static string GetRandomGradient()
    {
        return GradientColors[Random.Next(GradientColors.Count)];
    }
    }
}