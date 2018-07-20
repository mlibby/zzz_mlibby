using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mlibby.Controllers
{
    public class AiController : Controller
    {
        public AiController()
        {
            ViewBag.ActiveTab = "AI";
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Search()
        {
            return View();
        }

        public ActionResult Puzzle()
        {
            return View();
        }

        public ActionResult ECMAScript6()
        {
            return View();
        }
    }
}