namespace FrontEnd.Model;

public class Product
{
    public int CompanyId { get; set; }
    public int MaxDrawCount { get; set; }
    public string[] OptionalProductFilter { get; set; }
}