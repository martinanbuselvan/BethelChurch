using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

using BethelChurchAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BethelChurchAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  //  [EnableCors("AllowOrigin")]
    public class MemberController : ControllerBase
    {
        List<Member> members = new List<Member>();
        // GET api/values
        [HttpGet]
        // [Route("api/[controller]/Get")]
        [EnableCors("SiteCorsPolicy")]
        public ActionResult<IEnumerable<string>> Get()
        {

            //for (int i = 0; i <= 1000; i++)
            //{
            //    members.Add(new Member() { id = i, CardNumber = (100 + i), Name = "ABCDEFGH", Address = "ADRESSSSSSSSSSSSS", MobileNumber = 12345678 + i, Pincode = 620000 + i });
            //}

            //string jsonString = JsonSerializer.Serialize(members);
            string AssemblyPath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location).ToString();
            string path = Path.Combine(AssemblyPath, "Members.json");
            //  System.IO.File.WriteAllText(path, jsonString);
            members = JsonSerializer.Deserialize<List<Member>>(System.IO.File.ReadAllText(path));

            return Ok(members);
        }
        //[HttpPost]
        //[Route("AddMember")]
        //[EnableCors("AllowOrigin")]
        [EnableCors("SiteCorsPolicy")]
        [HttpPost]
        public HttpResponseMessage AddMember([FromForm]Member model)
        {
            string AssemblyPath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location).ToString();
            string path = Path.Combine(AssemblyPath, "Members.json");
            members = JsonSerializer.Deserialize<List<Member>>(System.IO.File.ReadAllText(path));

            if (members.Any(x => x.id == model.id))
            {
                int id = model.id;
                members.Remove(members.Find(x => x.id == model.id));
            }
            else
            {
                int id = (members.OrderBy(x => x.id)).Last().id;
                model.id = id + 1;
            }

            members.Add(model);
            var orderedMember = members.OrderBy(x => x.id);
            string jsonString = JsonSerializer.Serialize(orderedMember);
            System.IO.File.WriteAllText(path, jsonString);
            return new HttpResponseMessage(HttpStatusCode.OK) { Content = new StringContent("Success") };
        }

        //[HttpPost]
        //[Route("DeleteMember")]
        //[EnableCors("AllowOrigin")]
        //public IActionResult DeleteMember([FromForm]Member model)
        //{
        //    string AssemblyPath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location).ToString();
        //    string path = Path.Combine(AssemblyPath, "Members.json");
        //    members = JsonSerializer.Deserialize<List<Member>>(System.IO.File.ReadAllText(path));

        //    if (members.Any(x => x.id == model.id))
        //    {
        //        int id = model.id;
        //        members.Remove(members.Find(x => x.id == model.id));
        //    }
          
        //    string jsonString = JsonSerializer.Serialize(members);
        //    System.IO.File.WriteAllText(path, jsonString);
        //    return RedirectToAction("Sucess");
        //}
    }
}