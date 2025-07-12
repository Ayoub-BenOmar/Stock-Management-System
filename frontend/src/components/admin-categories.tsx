import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Edit, Trash2, Check, X } from "lucide-react";
import AdminSidebar from "./admin-sidebar";

interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Could not load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    setAdding(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add category");
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      setError("Could not add category.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    setError("");
    try {
      const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete category");
      fetchCategories();
    } catch (err) {
      setError("Could not delete category.");
    }
  };

  const startEdit = (cat: Category) => {
    setEditId(cat.id);
    setEditName(cat.name);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
  };

  const handleEdit = async (id: number) => {
    if (!editName.trim()) return;
    setEditLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });
      if (!res.ok) throw new Error("Failed to update category");
      setEditId(null);
      setEditName("");
      fetchCategories();
    } catch (err) {
      setError("Could not update category.");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar activeItem="categories" />
      <div className="flex-1 flex flex-col ml-64">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <h1 className="text-xl font-semibold">Category Management</h1>
        </header>
        <div className="flex-1 space-y-4 p-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Manage your product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-6">
                <Input
                  placeholder="Add new category"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleAddCategory(); }}
                  disabled={adding}
                />
                <Button onClick={handleAddCategory} disabled={adding || !newCategory.trim()}>
                  Add
                </Button>
              </div>
              {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">Loading...</TableCell>
                      </TableRow>
                    ) : categories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">No categories found.</TableCell>
                      </TableRow>
                    ) : (
                      categories.map(cat => (
                        <TableRow key={cat.id}>
                          <TableCell>
                            {editId === cat.id ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  value={editName}
                                  onChange={e => setEditName(e.target.value)}
                                  className="h-8"
                                  disabled={editLoading}
                                />
                                <Button size="icon" variant="ghost" onClick={() => handleEdit(cat.id)} disabled={editLoading}>
                                  <Check className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button size="icon" variant="ghost" onClick={cancelEdit}>
                                  <X className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            ) : (
                              <span>{cat.name}</span>
                            )}
                          </TableCell>
                          <TableCell>{new Date(cat.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(cat.updatedAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="icon" variant="ghost" onClick={() => startEdit(cat)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="ghost" onClick={() => handleDelete(cat.id)}>
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
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
        </div>
      </div>
    </div>
  );
} 