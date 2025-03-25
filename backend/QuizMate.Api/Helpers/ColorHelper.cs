namespace QuizMate.Api.Helpers
{
    public static class ColorHelper
    {
        private static readonly List<string> GradientColors = new()
        {
            "from-blue-700 to-blue-500",
            "from-indigo-700 to-indigo-500",
            "from-purple-700 to-purple-500",
            "from-pink-700 to-pink-500",
            "from-red-700 to-red-500",
            "from-orange-700 to-orange-500",
            "from-amber-700 to-amber-500",
            "from-yellow-700 to-yellow-500",
            "from-lime-700 to-lime-500",
            "from-green-700 to-green-500",
            "from-emerald-700 to-emerald-500",
            "from-teal-700 to-teal-500",
            "from-cyan-700 to-cyan-500",
            "from-sky-700 to-sky-500",
            "from-rose-700 to-rose-500",
            "from-fuchsia-700 to-fuchsia-500",
            "from-violet-700 to-violet-500"
        };

        private static readonly Random Random = new();

        public static string GetRandomGradient()
        {
            return GradientColors[Random.Next(GradientColors.Count)];
        }
    }
}