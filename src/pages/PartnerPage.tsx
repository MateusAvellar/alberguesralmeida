import { useParams } from "react-router-dom";
import { Mail, Phone, Globe, Tag } from "lucide-react";

const PartnerPage = () => {
  const { partner } = useParams();

  const partnerInfo = {
    turistar: {
      name: "Turistar",
      description: "Agência especializada em passeios e experiências únicas no Rio de Janeiro",
      email: "contato@turistar.com",
      phone: "+55 21 3333-4444",
      website: "www.turistar.com",
      coupon: null,
    },
    transfer: {
      name: "Transfer",
      description: "Serviço de transporte seguro e confiável do aeroporto ao hotel",
      email: "contato@transfer.com",
      phone: "+55 21 5555-6666",
      website: "www.transfer.com",
      coupon: null,
    },
    "comida-de-casa": {
      name: "Comida de Casa",
      description: "Restaurante com comida caseira e ambiente acolhedor, oferecendo o melhor da culinária tradicional brasileira.",
      email: "contato@comidadecasa.com",
      phone: "+55 21 7777-8888",
      website: "www.comidadecasa.com",
      coupon: "PARCEIROS20",
    },
  };

  const info = partnerInfo[partner as keyof typeof partnerInfo] || partnerInfo.turistar;

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card p-8 rounded-xl shadow-xl">
            <h1 className="text-4xl font-bold mb-6 text-primary">{info.name}</h1>
            <p className="text-lg text-muted-foreground mb-8">{info.description}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{info.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{info.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Globe className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p className="font-medium">{info.website}</p>
                </div>
              </div>

              {info.coupon && (
                <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-lg border-2 border-accent/20">
                  <Tag className="h-6 w-6 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cupom de Desconto</p>
                    <p className="text-2xl font-bold text-accent">{info.coupon}</p>
                    <p className="text-sm text-muted-foreground mt-1">20% de desconto para hóspedes</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;
