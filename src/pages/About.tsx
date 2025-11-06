import commonAreaImage from "@/assets/common-area.jpg";

interface AboutProps {
  translations: any;
}

const About = ({ translations }: AboutProps) => {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          {translations.about.title}
        </h1>
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl shadow-xl overflow-hidden">
            <img
              src={commonAreaImage}
              alt="Albergue Almeida"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="p-8 md:p-12">
              <p className="text-lg leading-relaxed text-foreground mb-6">
                {translations.about.content}
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-2 text-primary">
                    Localização privilegiada
                  </h3>
                  <p className="text-muted-foreground">
                    Próximo aos Arcos da Lapa e principais pontos turísticos do Rio de Janeiro
                  </p>
                </div>
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-semibold text-xl mb-2 text-secondary">
                    Ambiente acolhedor
                  </h3>
                  <p className="text-muted-foreground">
                    Atmosfera familiar com viajantes de todo o mundo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
