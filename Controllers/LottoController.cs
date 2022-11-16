using FrontEnd.Model;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FrontEnd.Controllers;

[ApiController]
[Route("[controller]")]
public class LottoController : ControllerBase
{
    private const string LatestResultsUrl = "https://data.api.thelott.com/sales/vmax/web/data/lotto/opendraws";

    private readonly ILogger<LottoController> _logger;

    public LottoController(ILogger<LottoController> logger)
    {
        _logger = logger;
    }


    [HttpGet]
    [Route("opendraws")]
    public async Task<IEnumerable<string>> Get()
    {
        var payload = new Product
        {
            CompanyId = 2,
            MaxDrawCount = 10,
            OptionalProductFilter = new[] {"OZLotto", "Super66", "Powerball","LuckyLotteries2"}
        };
        try
        {
            using var client = new HttpClient();
            var responseMessage =  await client.PostAsync(LatestResultsUrl,
                new StringContent(JsonConvert.SerializeObject(payload)));
            return new[] { await responseMessage.Content.ReadAsStringAsync()};
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}