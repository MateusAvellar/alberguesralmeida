import { Card } from "@/components/ui/card";
import { Building2, Users, Zap, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface RevenueProps {
  translations: any;
}

const Revenue = ({ translations }: RevenueProps) => {
  // Dados simulados - em produção viriam do backend
  const bookings = [
    { id: 1, room: "Quarto 4 Camas", guest: "João Silva", value: 300, date: "2025-11-10", status: "Confirmado" },
    { id: 2, room: "Quarto 8 Camas", guest: "Maria Santos", value: 960, date: "2025-11-11", status: "Confirmado" },
    { id: 3, room: "Quarto 12 Camas", guest: "Pedro Costa", value: 1320, date: "2025-11-12", status: "Pendente" },
    { id: 4, room: "Quarto 4 Camas", guest: "Ana Lima", value: 400, date: "2025-11-13", status: "Confirmado" },
    { id: 5, room: "Quarto 8 Camas", guest: "Carlos Rocha", value: 840, date: "2025-11-14", status: "Confirmado" },
  ];

  const totalBookings = bookings.reduce((sum, b) => b.status === "Confirmado" ? sum + b.value : sum, 0);

  const expenses = {
    funcionarios: 10 * 2500, // 10 funcionários
    contasBasicas: 3500, // água, luz, internet
    despesas: 2000, // manutenção, limpeza
    emergencias: 1500, // fundo de emergência
  };

  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const balance = totalBookings - totalExpenses;

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          {translations.revenue?.title || "Receita do Albergue"}
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Receitas</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  R$ {totalBookings.toFixed(2)}
                </p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
          </Card>

          <Card className="p-6 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Despesas</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  R$ {totalExpenses.toFixed(2)}
                </p>
              </div>
              <TrendingDown className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
          </Card>

          <Card className={`p-6 ${balance >= 0 ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800' : 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saldo</p>
                <p className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                  R$ {balance.toFixed(2)}
                </p>
              </div>
              <Building2 className={`h-12 w-12 ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`} />
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Reservas Recebidas</h2>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{booking.guest}</p>
                      <p className="text-sm text-muted-foreground">{booking.room}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "Confirmado" 
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" 
                        : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">{booking.date}</p>
                    <p className="font-bold text-primary">R$ {booking.value.toFixed(2)}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Despesas Mensais</h2>
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">Funcionários (10)</p>
                      <p className="text-sm text-muted-foreground">R$ 2.500 cada</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg">R$ {expenses.funcionarios.toFixed(2)}</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="h-8 w-8 text-secondary" />
                    <div>
                      <p className="font-semibold">Contas Básicas</p>
                      <p className="text-sm text-muted-foreground">Água, luz, internet</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg">R$ {expenses.contasBasicas.toFixed(2)}</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-8 w-8 text-accent" />
                    <div>
                      <p className="font-semibold">Despesas Operacionais</p>
                      <p className="text-sm text-muted-foreground">Manutenção, limpeza</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg">R$ {expenses.despesas.toFixed(2)}</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                    <div>
                      <p className="font-semibold">Fundo de Emergências</p>
                      <p className="text-sm text-muted-foreground">Reserva mensal</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg">R$ {expenses.emergencias.toFixed(2)}</p>
                </div>
              </Card>
            </div>

            <Card className="p-4 mt-4 bg-muted">
              <div className="flex items-center justify-between">
                <p className="font-bold text-lg">Total de Despesas</p>
                <p className="font-bold text-2xl text-destructive">R$ {totalExpenses.toFixed(2)}</p>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
          <h3 className="text-xl font-bold mb-2">Informações de Pagamento PIX</h3>
          <p className="text-muted-foreground">Banco do Brasil</p>
          <p className="text-lg font-mono font-bold">Chave PIX: 21999322372</p>
        </Card>
      </div>
    </div>
  );
};

export default Revenue;
