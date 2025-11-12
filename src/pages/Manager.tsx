import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Edit, Save, X } from "lucide-react";

interface ManagerProps {
  translations: any;
}

interface Room {
  id: string;
  room_number: number;
  bed_count: number;
  base_price: number;
  has_private_bathroom: boolean;
  is_accessible: boolean;
}

interface Bed {
  id: string;
  bed_number: number;
  price: number;
  room_id: string;
}

const Manager = ({ translations }: ManagerProps) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [beds, setBeds] = useState<Bed[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRoom, setEditingRoom] = useState<string | null>(null);
  const [newRoom, setNewRoom] = useState({
    room_number: 0,
    bed_count: 4,
    base_price: 100,
    has_private_bathroom: false,
    is_accessible: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: roomsData, error: roomsError } = await supabase
        .from("rooms")
        .select("*")
        .order("room_number");

      const { data: bedsData, error: bedsError } = await supabase
        .from("beds")
        .select("*")
        .order("bed_number");

      if (roomsError) throw roomsError;
      if (bedsError) throw bedsError;

      setRooms(roomsData || []);
      setBeds(bedsData || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async () => {
    try {
      const { data, error } = await supabase
        .from("rooms")
        .insert([newRoom])
        .select()
        .single();

      if (error) throw error;

      // Criar camas para o novo quarto
      const bedsToCreate = Array.from({ length: newRoom.bed_count }, (_, i) => ({
        bed_number: i + 1,
        price: newRoom.base_price,
        room_id: data.id,
      }));

      const { error: bedsError } = await supabase
        .from("beds")
        .insert(bedsToCreate);

      if (bedsError) throw bedsError;

      toast.success("Quarto adicionado com sucesso!");
      fetchData();
      setNewRoom({
        room_number: 0,
        bed_count: 4,
        base_price: 100,
        has_private_bathroom: false,
        is_accessible: false,
      });
    } catch (error) {
      console.error("Erro ao adicionar quarto:", error);
      toast.error("Erro ao adicionar quarto");
    }
  };

  const handleUpdateRoom = async (roomId: string, updates: Partial<Room>) => {
    try {
      const { error } = await supabase
        .from("rooms")
        .update(updates)
        .eq("id", roomId);

      if (error) throw error;

      toast.success("Quarto atualizado com sucesso!");
      fetchData();
      setEditingRoom(null);
    } catch (error) {
      console.error("Erro ao atualizar quarto:", error);
      toast.error("Erro ao atualizar quarto");
    }
  };

  const handleUpdateBedPrice = async (bedId: string, newPrice: number) => {
    try {
      const { error } = await supabase
        .from("beds")
        .update({ price: newPrice })
        .eq("id", bedId);

      if (error) throw error;

      toast.success("Preço da cama atualizado!");
      fetchData();
    } catch (error) {
      console.error("Erro ao atualizar preço:", error);
      toast.error("Erro ao atualizar preço");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Painel de Gestão
            </h1>
            <p className="text-muted-foreground">
              Gerencie quartos, camas e disponibilidade
            </p>
          </div>
        </div>

        {/* Adicionar Novo Quarto */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Adicionar Novo Quarto
            </CardTitle>
            <CardDescription>
              Preencha os dados para criar um novo quarto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="room_number">Número do Quarto</Label>
                <Input
                  id="room_number"
                  type="number"
                  value={newRoom.room_number}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, room_number: parseInt(e.target.value) })
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="bed_count">Quantidade de Camas</Label>
                <Input
                  id="bed_count"
                  type="number"
                  value={newRoom.bed_count}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, bed_count: parseInt(e.target.value) })
                  }
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="base_price">Preço Base (R$)</Label>
                <Input
                  id="base_price"
                  type="number"
                  value={newRoom.base_price}
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, base_price: parseFloat(e.target.value) })
                  }
                  className="mt-2"
                />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={newRoom.has_private_bathroom}
                  onCheckedChange={(checked) =>
                    setNewRoom({ ...newRoom, has_private_bathroom: checked })
                  }
                />
                <Label>Banheiro Privativo</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={newRoom.is_accessible}
                  onCheckedChange={(checked) =>
                    setNewRoom({ ...newRoom, is_accessible: checked })
                  }
                />
                <Label>Acessível</Label>
              </div>
            </div>
            <Button onClick={handleAddRoom} className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Quarto
            </Button>
          </CardContent>
        </Card>

        {/* Lista de Quartos */}
        <Card>
          <CardHeader>
            <CardTitle>Quartos Cadastrados</CardTitle>
            <CardDescription>
              Gerencie os quartos e suas configurações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número</TableHead>
                  <TableHead>Camas</TableHead>
                  <TableHead>Preço Base</TableHead>
                  <TableHead>Banheiro</TableHead>
                  <TableHead>Acessível</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.room_number}</TableCell>
                    <TableCell>{room.bed_count}</TableCell>
                    <TableCell>
                      {editingRoom === room.id ? (
                        <Input
                          type="number"
                          defaultValue={room.base_price}
                          onBlur={(e) =>
                            handleUpdateRoom(room.id, {
                              base_price: parseFloat(e.target.value),
                            })
                          }
                          className="w-24"
                        />
                      ) : (
                        `R$ ${room.base_price}`
                      )}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={room.has_private_bathroom}
                        onCheckedChange={(checked) =>
                          handleUpdateRoom(room.id, {
                            has_private_bathroom: checked,
                          })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={room.is_accessible}
                        onCheckedChange={(checked) =>
                          handleUpdateRoom(room.id, { is_accessible: checked })
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setEditingRoom(editingRoom === room.id ? null : room.id)
                        }
                      >
                        {editingRoom === room.id ? (
                          <X className="w-4 h-4" />
                        ) : (
                          <Edit className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Gerenciamento de Camas */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Gerenciar Camas</CardTitle>
            <CardDescription>
              Ajuste preços individuais das camas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rooms.map((room) => {
                const roomBeds = beds.filter((bed) => bed.room_id === room.id);
                return (
                  <div key={room.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-3">
                      Quarto {room.room_number} - {roomBeds.length} camas
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {roomBeds.map((bed) => (
                        <div key={bed.id} className="space-y-1">
                          <Label className="text-xs">Cama {bed.bed_number}</Label>
                          <Input
                            type="number"
                            defaultValue={bed.price}
                            onBlur={(e) =>
                              handleUpdateBedPrice(bed.id, parseFloat(e.target.value))
                            }
                            className="h-8"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Manager;
