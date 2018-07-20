using System.Web;
using System.Web.Optimization;

namespace mlibby
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/libs").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/underscore.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/ai").Include(
                "~/js/ai/frontier.js",
                "~/js/ai/fifo-frontier.js",
                "~/js/ai/lifo-frontier.js",
                "~/js/ai/priority-frontier.js",

                "~/js/ai/searchable.js",
                "~/js/ai/puzzle.js",

                "~/js/ai/search-node.js",
                "~/js/ai/search.js",
                "~/js/ai/tree-search.js",
                "~/js/ai/graph-search.js",
                "~/js/ai/graph-search-bfs.js",
                "~/js/ai/graph-search-dfs.js",
                "~/js/ai/uniform-cost-search.js",

                "~/js/ai/graph.js",
                "~/js/ai/romania.js"
                ));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                "~/Content/normalize.css",
                "~/Content/bootstrap.css",
                "~/css/site.css",
                "~/css/mlibby-icons.css",
                "~/css/befunge.css",
                "~/css/psytzee.css",
                "~/css/turing.css"
                ));
        }
    }
}
