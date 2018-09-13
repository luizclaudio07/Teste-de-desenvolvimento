using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Sorteio_Teste.Controllers
{
    public class SorteioController : Controller
    {
        // GET: Sorteio
        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public string Sortear(List<string> lista)
        {

            Func<string> gerar = () =>
            {
                StringBuilder sorteado = new StringBuilder();
                Random r = new Random();

                for (int i = 0; i < 6; i++)
                {
                    var x = r.Next(0, 60).ToString();

                    while (sorteado.ToString().Contains(x+"|") || sorteado.ToString().Contains("|" + x + "|") || sorteado.ToString().Contains("|" + x))
                    {
                        x = r.Next(0, 60).ToString();
                    }

                    sorteado.Append(x);
                    if (i != 5)
                        sorteado.Append("|");
                }

                return sorteado.ToString();
            };


            string nSorteado = gerar();

            string resposta = "";

            foreach (var item in lista)
            {
                if(item == nSorteado)
                    resposta = "Números sorteados: " + nSorteado.Replace("|", " - ") + " . Parabéns, você acertou!";
            }

            if (string.IsNullOrEmpty(resposta))
                resposta = "Números sorteados: " + nSorteado.Replace("|", " - ") + ". Não foi dessa vez :(";


            return resposta;
        }
    }
}