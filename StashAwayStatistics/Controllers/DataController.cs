using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StashAwayStatistics.Controllers
{
 
    public class Filter
    {
        public int? Months { get; set; }
        public string Type { get; set; }
    }
    
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {

        private IHostingEnvironment _env;

        public DataController(IHostingEnvironment env)
        {
            _env = env;
        }
        // GET: api/Data
        [HttpGet]
        public IEnumerable<Models.Data> Get([FromQuery] Filter filter)
        {
            string json = System.IO.File.ReadAllText(System.IO.Path.Combine(_env.WebRootPath, "data", string.Format("{0}_index.json", filter.Type ?? "stashaway")));
            var data = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Models.Data>>(json);

            if (filter.Months.HasValue)
                return data.Where(d => d.Date >= DateTime.Now.AddMonths(filter.Months.Value * -1)).ToList();
            else
                return data;
        }

        // GET: api/Data/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Data
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Data/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
