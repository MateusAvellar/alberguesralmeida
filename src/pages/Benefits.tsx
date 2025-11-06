import { Percent, Bed } from "lucide-react";

interface BenefitsProps {
  translations: any;
}

const Benefits = ({ translations }: BenefitsProps) => {
  const benefits = [
    {
      icon: Percent,
      title: translations.benefits.discounts,
      description: translations.benefits.discountsDesc,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Bed,
      title: translations.benefits.bedding,
      description: translations.benefits.beddingDesc,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          {translations.benefits.title}
        </h1>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-card p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <div className={`${benefit.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                  <Icon className={`h-8 w-8 ${benefit.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{benefit.title}</h3>
                <p className="text-lg text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
