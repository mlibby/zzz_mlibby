using System.Web;
using System.Web.Optimization;

namespace mlibby
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/js").Include(
                "~/js/befunge.js",
                "~/js/rgb_clock.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/libs").Include(
                "~/Scripts/lib/jquery-3.1.1.js",
                "~/Scripts/lib/bootstrap.js"
                ));

            bundles.Add(new StyleBundle("~/bundles/css").Include(
                "~/Content/normalize.css",
                "~/Content/bootstrap.css",
                "~/Content/bootstrap-theme.css",
                "~/css/main.css",
                "~/css/befunge.css"
                ));
        }
    }
}
