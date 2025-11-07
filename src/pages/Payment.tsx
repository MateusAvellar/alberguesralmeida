import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, Smartphone, Banknote, Loader2 } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import { supabase } from "@/integrations/supabase/client";

interface PaymentProps {
  translations: any;
}

const Payment = ({ translations }: PaymentProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [showTimeout, setShowTimeout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    phone: "",
    email: "",
    password: "",
    cvv: "",
    cardNumber: "",
  });

  useEffect(() => {
    // Timeout de 2 minutos
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setShowTimeout(true);
      }, 120000); // 2 minutos
    };

    resetTimeout();

    const handleActivity = () => {
      resetTimeout();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("click", handleActivity);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, []);

  useEffect(() => {
    // Gerar QR Code para PIX
    if (paymentMethod === "pix") {
      const pixData = "00020126580014br.gov.bcb.pix013621999322372520400005303986540550.005802BR5925Albergue Almeida6009Rio6304";
      QRCode.toDataURL(pixData)
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error(err));
    }
  }, [paymentMethod]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const roomData = location.state?.roomId || 1;
      
      // Enviar email de confirmação
      const { error } = await supabase.functions.invoke("send-booking-confirmation", {
        body: {
          customerName: formData.name,
          customerEmail: formData.email,
          roomName: `Quarto ${roomData}`,
          checkIn: new Date().toLocaleDateString("pt-BR"),
          checkOut: new Date(Date.now() + 86400000 * 3).toLocaleDateString("pt-BR"),
          totalPrice: 300,
          paymentMethod: paymentMethod === "pix" ? "PIX" : paymentMethod === "credit" ? "Crédito" : "Débito",
        },
      });

      if (error) {
        console.error("Erro ao enviar email:", error);
      }

      toast.success("Pagamento processado com sucesso!");
      
      setTimeout(() => {
        navigate("/payment-confirmation", {
          state: {
            bookingData: {
              roomName: `Quarto ${roomData}`,
              totalPrice: 300,
              paymentMethod: paymentMethod === "pix" ? "PIX" : paymentMethod === "credit" ? "Crédito" : "Débito",
            },
          },
        });
      }, 1500);
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao processar pagamento");
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { id: "pix", label: translations.payment.pix, icon: Smartphone },
    { id: "credit", label: translations.payment.credit, icon: CreditCard },
    { id: "debit", label: translations.payment.debit, icon: Banknote },
  ];

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
    <>
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

                {paymentMethod === "pix" && qrCodeUrl && (
                  <div className="bg-muted p-6 rounded-lg text-center">
                    <h3 className="font-semibold text-lg mb-4">QR Code PIX</h3>
                    <img src={qrCodeUrl} alt="QR Code PIX" className="mx-auto mb-4 w-48 h-48" />
                    <p className="text-sm text-muted-foreground">
                      Banco do Brasil - Chave: 21999322372
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">{translations.payment.name || "Nome Completo"}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      maxLength={100}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cpf">{translations.payment.cpf}</Label>
                    <Input
                      id="cpf"
                      value={formData.cpf}
                      onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                      required
                      maxLength={14}
                      placeholder="000.000.000-00"
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
                      maxLength={15}
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
                      maxLength={100}
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
                          maxLength={19}
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
                    disabled={isProcessing}
                  >
                    {translations.payment.cancel}
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      translations.payment.proceed
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showTimeout} onOpenChange={setShowTimeout}>
        <DialogContent className="bg-gray-900/95 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              {translations.payment?.timeout || "Tempo Esgotado"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
            <p className="text-center text-muted-foreground mb-6">
              {translations.payment?.timeoutMessage || "Sua sessão expirou por inatividade."}
            </p>
            <Button
              onClick={() => {
                setShowTimeout(false);
                navigate("/rooms");
              }}
              className="bg-primary hover:bg-primary/90"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Payment;
