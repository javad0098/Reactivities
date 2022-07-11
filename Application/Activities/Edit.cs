using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public class CommandValidetor : AbstractValidator<Command>
            {
                public CommandValidetor()
                {
                    RuleFor(x => x.Activity).SetValidator(new ActivityValidetor());
                }
            }
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = _context.Activities?.Find(request.Activity.Id);
                if (activity == null) return null;
                _mapper.Map(request.Activity, activity);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Faild to edit Activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
