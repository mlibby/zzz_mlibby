using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mlibby.Controllers
{
    public class CodeController : Controller
    {
        // GET: Code
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult RgbClock()
        {
            return View();
        }

        public ActionResult Befunge()
        {
            return View();
        }
    }
}