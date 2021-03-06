using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities() => await _context.Activities.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivities(Guid id) => await _context.Activities.FindAsync(id);








    }
}