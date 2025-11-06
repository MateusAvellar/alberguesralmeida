import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Smartphone, Banknote } from "lucide-react";
import { toast } from "sonner";

interface PaymentProps {
  translations: any;
}

const Payment = ({ translations }: PaymentProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [formData, setFormData] = useState({
    cpf: "",
    phone: "",
    email: "",
    password: "",
    cvv: "",
    cardNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pagamento processado com sucesso!");
    setTimeout(() => navigate("/"), 2000);
  };

  const paymentMethods = [
    { id: "pix", label: translations.payment.pix, icon: Smartphone },
    { id: "credit", label: translations.payment.credit, icon: CreditCard },
    { id: "debit", label: translations.payment.debit, icon: Banknote },
  ];

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            {translations.payment.title}
          </h1>

          <div className="bg-card p-8 rounded-xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  {translations.payment.method}
                </Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <label
                          key={method.id}
                          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={method.id} id={method.id} className="mr-4" />
                          <Icon className="h-6 w-6 mr-3 text-primary" />
                          <span className="font-medium">{method.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </RadioGroup>
                <p className="text-sm text-muted-foreground mt-2">
                  {translations.payment.noInstallments}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="cpf">{translations.payment.cpf}</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">{translations.payment.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">{translations.payment.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="password">{translations.payment.password}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="mt-2"
                  />
                </div>

                {(paymentMethod === "credit" || paymentMethod === "debit") && (
                  <>
                    <div>
                      <Label htmlFor="cardNumber">{translations.payment.cardNumber}</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">{translations.payment.cvv}</Label>
                      <Input
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        required
                        maxLength={4}
                        className="mt-2"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{translations.payment.refundPolicy}</h3>
                <p className="text-sm text-muted-foreground">{translations.payment.refundText}</p>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/rooms")}
                >
                  {translations.payment.cancel}
                </Button>
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  {translations.payment.proceed}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
