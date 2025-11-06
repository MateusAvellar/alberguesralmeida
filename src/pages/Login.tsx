import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface LoginProps {
  translations: any;
}

const Login = ({ translations }: LoginProps) => {
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    document: "",
  });

  const [staffData, setStaffData] = useState({
    name: "",
    password: "",
  });

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login realizado com sucesso!");
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login de funcionário realizado com sucesso!");
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">
            {translations.login.title}
          </h1>

          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="client">{translations.login.client}</TabsTrigger>
              <TabsTrigger value="staff">{translations.login.staff}</TabsTrigger>
            </TabsList>

            <TabsContent value="client">
              <div className="bg-card p-8 rounded-xl shadow-xl">
                <form onSubmit={handleClientSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="client-name">{translations.login.name}</Label>
                    <Input
                      id="client-name"
                      value={clientData.name}
                      onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="client-email">{translations.login.email}</Label>
                    <Input
                      id="client-email"
                      type="email"
                      value={clientData.email}
                      onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="client-document">{translations.login.document}</Label>
                    <Input
                      id="client-document"
                      value={clientData.document}
                      onChange={(e) => setClientData({ ...clientData, document: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    {translations.login.loginBtn}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="staff">
              <div className="bg-card p-8 rounded-xl shadow-xl">
                <form onSubmit={handleStaffSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="staff-name">{translations.login.name}</Label>
                    <Input
                      id="staff-name"
                      value={staffData.name}
                      onChange={(e) => setStaffData({ ...staffData, name: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="staff-password">{translations.login.password}</Label>
                    <Input
                      id="staff-password"
                      type="password"
                      value={staffData.password}
                      onChange={(e) => setStaffData({ ...staffData, password: e.target.value })}
                      required
                      className="mt-2"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
                    {translations.login.loginBtn}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
