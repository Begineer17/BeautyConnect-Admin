'use client';

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart3,
  Users,
  Star,
  TrendingUp,
  Calendar,
  Edit,
  Trash2,
  Plus,
  Upload,
  Sparkles,
  Bell,
  Crown,
  Clock,
  Camera,
  Gift,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContact } from "@/hooks/use-contact";
import { useService } from "@/hooks/use-service";
import { useReview } from "@/hooks/use-review";
import { UpdateServiceInput, Service, CreateServiceInput } from "@/types/service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminDashboard() {
  const { countContacts, contacts, loading, error, handleUpdateStatus } = useContact();
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredContacts = filterStatus === "all" 
    ? contacts 
    : contacts.filter(contact => contact.status === filterStatus);

  const [spaId, setSpaId] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("spaId");
    if (id) setSpaId(id);
  }, []);

  const { services, loading: loadingServices, error: errorServices, handleUpdateService, handleDeleteService, handleCreateService } = useService(spaId);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<UpdateServiceInput>({
    serviceId: "",
    name: "",
    description: "", // Chuỗi rỗng
    originalPrice: "0",
    currentPrice: "0",
    duration: "0",
    isHome: false,
  });

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setFormData({
      serviceId: service.id,
      name: service.name ?? "", 
      description: service.description ?? "",
      originalPrice: service.originalPrice ?? "0",
      currentPrice: service.currentPrice ?? "0",
      duration: service.duration ?? "0",
      isHome: service.isHome,
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isHome: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleUpdateService(formData);
      setEditingService(null);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  // Thêm state để quản lý dialog và dữ liệu form
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createFormData, setCreateFormData] = useState<CreateServiceInput>({
    serviceId: "",
    name: "",
    category: [],
    description: "",
    originalPrice: "0",
    currentPrice: "0",
    duration: "0",
    isHome: false,
    imageFile: undefined,
  });

  // Hàm xử lý thay đổi input trong form tạo mới
  const handleCreateFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCreateFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý thay đổi danh mục
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    setCreateFormData((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((cat) => cat !== category)
        : [...prev.category, category],
    }));
  };

  // Hàm xử lý thay đổi checkbox isHome
  const handleCreateCheckboxChange = (checked: boolean | "indeterminate") => {
    setCreateFormData((prev) => ({ ...prev, isHome: checked === true }));
  };

  // Hàm xử lý thay đổi file ảnh
  const handleCreateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCreateFormData((prev) => ({ ...prev, imageFile: file }));
    }
  };

  // Hàm xử lý submit form tạo mới
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleCreateService(createFormData);
      setIsCreateDialogOpen(false);
      setCreateFormData({
        serviceId: "",
        name: "",
        category: [],
        description: "",
        originalPrice: "0",
        currentPrice: "0",
        duration: "0",
        isHome: false,
        imageFile: undefined,
      });
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const { countReviews, reviews, isLoading, isError } = useReview(spaId);

  const stats = {
    totalContact: countContacts,
    totalReviews: countReviews,
    averageRating: 4.8,
    newCustomers: 23,
  };

  const recentReviews = [
    {
      id: 1,
      customer: "Minh Anh",
      rating: 5,
      comment: "Dịch vụ tuyệt vời! Nhân viên rất chuyên nghiệp và tận tình.",
      service: "Nail gel",
      date: "2024-12-18",
      status: "published",
    },
    {
      id: 2,
      customer: "Thu Hà",
      rating: 4,
      comment: "Massage rất thư giãn, không gian spa đẹp.",
      service: "Massage",
      date: "2024-12-17",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  BeautyConnect
                </span>
              </Link>
              <Badge className="bg-gradient-to-r from-pink-500 to-purple-500">Admin Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-pink-300 text-pink-600 bg-transparent">
                <Bell className="w-4 h-4 mr-2" />
                Thông báo
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg?height=40&width=40" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Chào mừng trở lại, Beauty Garden Spa!</h1>
          <p className="text-gray-600">Quản lý spa của bạn một cách hiệu quả và chuyên nghiệp</p>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="border-pink-100">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Liên hệ</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalContact}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-pink-100">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đánh giá</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalReviews}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-pink-100">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Điểm TB</p>
                <p className="text-2xl font-bold text-gray-800">{stats.averageRating}</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Content */}
        <Tabs defaultValue="contact" className="space-y-5">
          <TabsList className="grid w-full grid-cols-5 bg-pink-50 border border-pink-200">
            <TabsTrigger value="contact" className="data-[state=active]:bg-white data-[state=active]:text-pink-600">
              Liên hệ
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-white data-[state=active]:text-pink-600">
              Dịch vụ
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-white data-[state=active]:text-pink-600">
              Đánh giá
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:text-pink-600">
              Hồ sơ
            </TabsTrigger>
            <TabsTrigger value="upgrade" className="data-[state=active]:bg-white data-[state=active]:text-pink-600">
              Nâng cấp
            </TabsTrigger>
          </TabsList>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <Card className="border-pink-100">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Quản lý Liên hệ</span>
                  <Select defaultValue="all" onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="pending">Chờ xác nhận</SelectItem>
                      <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                    </SelectContent>
                  </Select>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-4 border border-pink-100 rounded-lg">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800">{contact.customerName}</h4>
                          <p className="text-sm text-gray-600">{contact.customerPhone}</p>
                        </div>
                        <div />
                        <div>
                          <p className="text-gray-800">{new Date(contact.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div />
                        <div>
                          <Badge className={contact.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                            {contact.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-300 text-green-600 bg-transparent"
                          onClick={() => handleUpdateStatus(contact.id)}
                        >
                          Cập nhật trạng thái
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <Card className="border-pink-100">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Quản lý dịch vụ</span>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm dịch vụ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Thêm dịch vụ mới</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleCreateSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Tên dịch vụ</Label>
                          <Input
                            id="name"
                            name="name"
                            value={createFormData.name}
                            onChange={handleCreateFormChange}
                            required
                          />
                        </div>
                        <div>
                          <Label>Danh mục</Label>
                          <div className="flex space-x-4">
                            {["Nail", "Spa", "Massage"].map((cat) => (
                              <div key={cat} className="flex items-center space-x-2">
                                <Checkbox
                                  id={cat}
                                  value={cat}
                                  checked={createFormData.category.includes(cat)}
                                  onCheckedChange={() => handleCategoryChange({ target: { value: cat } } as any)}
                                />
                                <Label htmlFor={cat}>{cat}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Mô tả</Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={createFormData.description}
                            onChange={handleCreateFormChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="originalPrice">Giá gốc</Label>
                          <Input
                            id="originalPrice"
                            name="originalPrice"
                            type="number"
                            value={createFormData.originalPrice}
                            onChange={handleCreateFormChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="currentPrice">Giá hiện tại</Label>
                          <Input
                            id="currentPrice"
                            name="currentPrice"
                            type="number"
                            value={createFormData.currentPrice}
                            onChange={handleCreateFormChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="duration">Thời lượng (phút)</Label>
                          <Input
                            id="duration"
                            name="duration"
                            type="number"
                            value={createFormData.duration}
                            onChange={handleCreateFormChange}
                            required
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="isHome"
                            checked={createFormData.isHome}
                            onCheckedChange={handleCreateCheckboxChange}
                          />
                          <Label htmlFor="isHome">Dịch vụ tại nhà</Label>
                        </div>
                        <div>
                          <Label htmlFor="imageFile">Ảnh minh họa</Label>
                          <Input
                            id="imageFile"
                            name="imageFile"
                            type="file"
                            accept="image/*"
                            onChange={handleCreateFileChange}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsCreateDialogOpen(false)}
                          >
                            Hủy
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                          >
                            Tạo dịch vụ
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loadingServices ? (
                    <p>Đang tải dịch vụ...</p>
                  ) : errorServices ? (
                    <p className="text-red-500">{errorServices}</p>
                  ) : (
                    services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 border border-pink-100 rounded-lg">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                          <div>
                            <h4 className="font-semibold text-gray-800">{service.name}</h4>
                            <Badge variant="secondary" className="mt-1 bg-pink-100 text-pink-700">
                              {service.category?.join(", ")}
                            </Badge>
                          </div>
                          <div>
                            <p className="font-bold text-pink-600">{Number(service.currentPrice).toLocaleString()}đ</p>
                          </div>
                          <div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{service.duration} phút</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600">{service.reviewCount} lượt đánh giá</p>
                          </div>
                          <div>
                            <Badge className="bg-yellow-100 text-yellow-700">Rating: {service.rating}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="border-pink-300 text-pink-600 bg-transparent" onClick={() => handleEditClick(service)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Cập nhật dịch vụ</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Tên dịch vụ</label>
                                  <Input name="name" value={formData.name} onChange={handleFormChange} className="border-pink-200" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                                  <Textarea name="description" value={formData.description} onChange={handleFormChange} className="border-pink-200" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Giá gốc</label>
                                  <Input name="originalPrice" value={formData.originalPrice} onChange={handleFormChange} className="border-pink-200" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Giá hiện tại</label>
                                  <Input name="currentPrice" value={formData.currentPrice} onChange={handleFormChange} className="border-pink-200" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian (phút)</label>
                                  <Input name="duration" value={formData.duration} onChange={handleFormChange} className="border-pink-200" />
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    name="isHome"
                                    checked={formData.isHome}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                  />
                                  <label className="text-sm font-medium text-gray-700">Dịch vụ tại nhà</label>
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh</label>
                                  <Input type="file" onChange={handleFileChange} className="border-pink-200" />
                                </div>
                                <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                                  Lưu thay đổi
                                </Button>
                              </form>
                            </DialogContent>
                          </Dialog>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 bg-transparent"
                            onClick={() => handleDeleteService(service.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="border-pink-100">
              <CardHeader>
                <CardTitle>Quản lý đánh giá</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-gray-600">Đang tải đánh giá...</p>
                ) : isError ? (
                  <p className="text-red-600">Lỗi: {isError}</p>
                ) : reviews.length === 0 ? (
                  <p className="text-gray-600">Chưa có đánh giá nào.</p>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-6 border border-pink-100 rounded-xl shadow-sm hover:shadow-md transition">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src="/placeholder-user.jpg?height=48&width=48"
                                alt={review.userName}
                                className="object-cover"
                              />
                              <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                              <p className="text-sm text-gray-500">{review.serviceName}</p>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < parseInt(review.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-400 whitespace-nowrap">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Comment */}
                        <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                      </div>
                    ))}
                  </div>

                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-pink-100">
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên Spa</label>
                    <Input defaultValue="Beauty Garden Spa" className="border-pink-200" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                    <Input defaultValue="123 Nguyễn Huệ, Quận 1, TP.HCM" className="border-pink-200" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <Input defaultValue="0901234567" className="border-pink-200" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <Input defaultValue="https://beautygarden.com" className="border-pink-200" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                    <Textarea
                      defaultValue="Beauty Garden Spa là điểm đến lý tưởng cho những ai tìm kiếm sự thư giãn và chăm sóc sắc đẹp chuyên nghiệp."
                      className="border-pink-200"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-pink-100">
                <CardHeader>
                  <CardTitle>Hình ảnh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                    <div className="flex items-center space-x-4">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="Logo"
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full border-2 border-pink-200"
                      />
                      <Button variant="outline" className="border-pink-300 text-pink-600 bg-transparent">
                        <Upload className="w-4 h-4 mr-2" />
                        Thay đổi logo
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh bìa</label>
                    <div className="border-2 border-dashed border-pink-200 rounded-lg p-6 text-center">
                      <Camera className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Kéo thả ảnh vào đây hoặc</p>
                      <Button variant="outline" className="border-pink-300 text-pink-600 bg-transparent">
                        Chọn ảnh
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thư viện ảnh</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="relative group">
                          <Image
                            src={`/placeholder.svg?height=100&width=100`}
                            alt={`Gallery ${i}`}
                            width={100}
                            height={100}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button size="sm" variant="secondary">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                Lưu thay đổi
              </Button>
            </div>
          </TabsContent>

          {/* Upgrade Tab */}
          <TabsContent value="upgrade" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-pink-100">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Gói Cơ Bản</CardTitle>
                  <div className="text-3xl font-bold text-gray-800">Miễn phí</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Hiển thị thông tin cơ bản
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Tối đa 5 ảnh
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Quản lý đánh giá
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                      Hiển thị nổi bật
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                      Thống kê chi tiết
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent" disabled>
                    Gói hiện tại
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-pink-300 ring-2 ring-pink-200 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-pink-500 to-purple-500">Phổ biến</Badge>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Gói Premium</CardTitle>
                  <div className="text-3xl font-bold text-pink-600">299k/tháng</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Tất cả tính năng cơ bản
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Hiển thị nổi bật
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Không giới hạn ảnh
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Thống kê chi tiết
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Hỗ trợ ưu tiên
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                    Nâng cấp ngay
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-yellow-300">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Crown className="w-6 h-6 text-yellow-500 mr-2" />
                    <CardTitle className="text-xl">Gói VIP</CardTitle>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600">599k/tháng</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Tất cả tính năng Premium
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Hiển thị đầu trang
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Badge VIP
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Quảng cáo trên social
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Account manager riêng
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    Nâng cấp VIP
                  </Button>
                </CardContent>
              </Card>
            </div>
            <Card className="border-pink-100">
              <CardHeader>
                <CardTitle>Lợi ích khi nâng cấp</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Tăng lượt xem</h3>
                    <p className="text-sm text-gray-600">Hiển thị nổi bật giúp tăng 300% lượt xem</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Nhiều khách hàng</h3>
                    <p className="text-sm text-gray-600">Tiếp cận được nhiều khách hàng tiềm năng hơn</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Thống kê chi tiết</h3>
                    <p className="text-sm text-gray-600">Theo dõi hiệu quả kinh doanh một cách chi tiết</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Ưu đãi đặc biệt</h3>
                    <p className="text-sm text-gray-600">Được tham gia các chương trình ưu đãi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}