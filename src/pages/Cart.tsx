import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CartProps {
  translations: any;
}

const Cart = ({ translations }: CartProps) => {
  const { cart, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error(translations.cart.emptyCart);
      return;
    }
    navigate("/payment");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          {translations.cart.title}
        </h1>

        {cart.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground mb-4">{translations.cart.empty}</p>
              <Button onClick={() => navigate("/")}>{translations.cart.continueShopping}</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 mb-6">
              {cart.map((item, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.room.name}</h3>
                      <p className="text-muted-foreground">
                        {item.beds} {item.beds === 1 ? translations.cart.bed : translations.cart.beds}
                      </p>
                      <p className="text-primary font-semibold">
                        R$ {(item.room.price_per_bed * item.beds).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        removeFromCart(index);
                        toast.success(translations.cart.itemRemoved);
                      }}
                    >
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>{translations.cart.summary}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>{translations.cart.totalItems}:</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-primary">
                  <span>{translations.cart.total}:</span>
                  <span>R$ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button variant="outline" onClick={clearCart} className="flex-1">
                    {translations.cart.clearCart}
                  </Button>
                  <Button onClick={handleCheckout} className="flex-1">
                    {translations.cart.checkout}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
