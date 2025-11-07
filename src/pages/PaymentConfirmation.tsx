import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface PaymentConfirmationProps {
  translations: any;
}

const PaymentConfirmation = ({ translations }: PaymentConfirmationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData;

  useEffect(() => {
    if (!bookingData) {
      navigate("/rooms");
    }
  }, [bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  return (
    <div className="min-h-screen py-24 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-primary">
            {translations.confirmation?.title || "Pagamento Concluído!"}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            {translations.confirmation?.message || "Sua reserva foi confirmada com sucesso."}
          </p>

          <div className="bg-card p-8 rounded-xl shadow-xl mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {translations.confirmation?.details || "Detalhes da Reserva"}
            </h2>
            
            <div className="space-y-3 text-left">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">{translations.confirmation?.room || "Quarto"}:</span>
                <span>{bookingData.roomName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">{translations.confirmation?.amount || "Valor"}:</span>
                <span>R$ {bookingData.totalPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">{translations.confirmation?.method || "Forma de Pagamento"}:</span>
                <span>{bookingData.paymentMethod}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            {translations.confirmation?.emailSent || "Um email de confirmação foi enviado para você."}
          </p>

          <Button
            size="lg"
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90"
          >
            {translations.confirmation?.backHome || "Voltar para o Início"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
