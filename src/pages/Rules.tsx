import { Clock, Ban, Wind, Cigarette } from "lucide-react";

interface RulesProps {
  translations: any;
}

const Rules = ({ translations }: RulesProps) => {
  const rules = [
    { icon: Clock, text: translations.rules.quietHours, color: "text-primary" },
    { icon: Wind, text: translations.rules.windows, color: "text-secondary" },
    { icon: Cigarette, text: translations.rules.smoking, color: "text-primary" },
    { icon: Ban, text: translations.rules.substances, color: "text-destructive" },
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          {translations.rules.title}
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="grid gap-6">
            {rules.map((rule, index) => {
              const Icon = rule.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${rule.color} mt-1`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <p className="text-lg text-foreground flex-1">{rule.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 bg-muted p-6 rounded-xl">
            <p className="text-center text-muted-foreground">
              O cumprimento das regras garante uma experiência agradável para todos os hóspedes.
              Agradecemos sua colaboração!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
