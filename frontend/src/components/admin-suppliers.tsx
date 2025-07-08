import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Edit, Trash2, Check, X, Plus } from "lucide-react";
import AdminSidebar from "./admin-sidebar";

interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ name: "", email: "", phone: "", address: "" });
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editSupplier, setEditSupplier] = useState({ name: "", email: "", phone: "", address: "" });
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/suppliers");
      if (!res.ok) throw new Error("Failed to fetch suppliers");
      const data = await res.json();
      setSuppliers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Could not load suppliers.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = async () => {
    if (!newSupplier.name.trim() || !newSupplier.email.trim() || !newSupplier.phone.trim()) return;
    setAdding(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newSupplier.name.trim(),
          email: newSupplier.email.trim(),
          phone: newSupplier.phone.trim(),
          address: newSupplier.address.trim() || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to add supplier");
      setNewSupplier({ name: "", email: "", phone: "", address: "" });
      setModalOpen(false);
      fetchSuppliers();
    } catch (err) {
      setError("Could not add supplier.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    setError("");
    try {
      const res = await fetch(`http://localhost:3000/api/suppliers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete supplier");
      fetchSuppliers();
    } catch (err) {
      setError("Could not delete supplier.");
    }
  };

  const startEdit = (sup: Supplier) => {
    setEditId(sup.id);
    setEditSupplier({
      name: sup.name,
      email: sup.email,
      phone: sup.phone,
      address: sup.address || "",
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditSupplier({ name: "", email: "", phone: "", address: "" });
  };

  const handleEdit = async (id: number) => {
    if (!editSupplier.name.trim() || !editSupplier.email.trim() || !editSupplier.phone.trim()) return;
    setEditLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:3000/api/suppliers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editSupplier.name.trim(),
          email: editSupplier.email.trim(),
          phone: editSupplier.phone.trim(),
          address: editSupplier.address.trim() || null,
        }),
      });
      if (!res.ok) throw new Error("Failed to update supplier");
      setEditId(null);
      setEditSupplier({ name: "", email: "", phone: "", address: "" });
      fetchSuppliers();
    } catch (err) {
      setError("Could not update supplier.");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar activeItem="suppliers" />
      <div className="flex-1 flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <h1 className="text-xl font-semibold">Supplier Management</h1>
        </header>
        <div className="flex-1 space-y-4 p-4">
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Suppliers</CardTitle>
                  <CardDescription>Manage your suppliers</CardDescription>
                </div>
                <Button onClick={() => setModalOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Supplier
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">Loading...</TableCell>
                      </TableRow>
                    ) : suppliers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">No suppliers found.</TableCell>
                      </TableRow>
                    ) : (
                      suppliers.map(sup => (
                        <TableRow key={sup.id}>
                          <TableCell>
                            {editId === sup.id ? (
                              <Input
                                value={editSupplier.name}
                                onChange={e => setEditSupplier({ ...editSupplier, name: e.target.value })}
                                className="h-8"
                                disabled={editLoading}
                              />
                            ) : (
                              <span>{sup.name}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editId === sup.id ? (
                              <Input
                                value={editSupplier.email}
                                onChange={e => setEditSupplier({ ...editSupplier, email: e.target.value })}
                                className="h-8"
                                disabled={editLoading}
                              />
                            ) : (
                              <span>{sup.email}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editId === sup.id ? (
                              <Input
                                value={editSupplier.phone}
                                onChange={e => setEditSupplier({ ...editSupplier, phone: e.target.value })}
                                className="h-8"
                                disabled={editLoading}
                              />
                            ) : (
                              <span>{sup.phone}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {editId === sup.id ? (
                              <Input
                                value={editSupplier.address}
                                onChange={e => setEditSupplier({ ...editSupplier, address: e.target.value })}
                                className="h-8"
                                disabled={editLoading}
                              />
                            ) : (
                              <span>{sup.address}</span>
                            )}
                          </TableCell>
                          <TableCell>{new Date(sup.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(sup.updatedAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {editId === sup.id ? (
                                <>
                                  <Button size="icon" variant="ghost" onClick={() => handleEdit(sup.id)} disabled={editLoading}>
                                    <Check className="h-4 w-4 text-green-600" />
                                  </Button>
                                  <Button size="icon" variant="ghost" onClick={cancelEdit}>
                                    <X className="h-4 w-4 text-red-600" />
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button size="icon" variant="ghost" onClick={() => startEdit(sup)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost" onClick={() => handleDelete(sup.id)}>
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Add Supplier Modal */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add Supplier</h2>
                <div className="space-y-3">
                  <Input
                    placeholder="Name"
                    value={newSupplier.name}
                    onChange={e => setNewSupplier({ ...newSupplier, name: e.target.value })}
                    disabled={adding}
                  />
                  <Input
                    placeholder="Email"
                    value={newSupplier.email}
                    onChange={e => setNewSupplier({ ...newSupplier, email: e.target.value })}
                    disabled={adding}
                  />
                  <Input
                    placeholder="Phone"
                    value={newSupplier.phone}
                    onChange={e => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                    disabled={adding}
                  />
                  <Input
                    placeholder="Address (optional)"
                    value={newSupplier.address}
                    onChange={e => setNewSupplier({ ...newSupplier, address: e.target.value })}
                    disabled={adding}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setModalOpen(false)} disabled={adding}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSupplier} disabled={adding || !newSupplier.name.trim() || !newSupplier.email.trim() || !newSupplier.phone.trim()}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 