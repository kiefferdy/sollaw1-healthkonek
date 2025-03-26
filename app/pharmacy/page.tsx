'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Search, Filter, Plus, Pill, ShoppingCart, Package, Clock, X, Check, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const MainLayout = dynamic(() => import('@/components/layout/MainLayout'), { ssr: false });

// Types
type MedicationType = 'prescription' | 'otc';
type MedicationCategory = 'heart' | 'diabetes' | 'pain' | 'allergy' | 'antibiotics' | 'vitamins';
type MedicationStatus = 'active' | 'refill' | 'expired';

interface Medication {
  id: number;
  name: string;
  genericName: string;
  dosage: string;
  type: MedicationType;
  category: MedicationCategory;
  status: MedicationStatus;
  prescription?: {
    doctor: string;
    date: string;
    refills: number;
    expiryDate: string;
    instructions: string;
  };
  price: number;
  image: string;
}

interface Order {
  id: number;
  medications: {
    id: number;
    name: string;
    dosage: string;
    quantity: number;
    price: number;
  }[];
  status: 'processing' | 'shipped' | 'delivered';
  date: string;
  totalPrice: number;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// Sample data
const medications: Medication[] = [
  {
    id: 1,
    name: 'Metformin',
    genericName: 'Metformin Hydrochloride',
    dosage: '500mg',
    type: 'prescription',
    category: 'diabetes',
    status: 'active',
    prescription: {
      doctor: 'Dr. Jose Reyes',
      date: '2023-03-15',
      refills: 3,
      expiryDate: '2023-09-15',
      instructions: 'Take 1 tablet twice daily with meals',
    },
    price: 150.0,
    image: '/images/metformin.jpg',
  },
  {
    id: 2,
    name: 'Losartan',
    genericName: 'Losartan Potassium',
    dosage: '50mg',
    type: 'prescription',
    category: 'heart',
    status: 'active',
    prescription: {
      doctor: 'Dr. Maria Santos',
      date: '2023-03-10',
      refills: 5,
      expiryDate: '2023-09-10',
      instructions: 'Take 1 tablet daily in the morning',
    },
    price: 200.0,
    image: '/images/losartan.jpg',
  },
  {
    id: 3,
    name: 'Atorvastatin',
    genericName: 'Atorvastatin Calcium',
    dosage: '20mg',
    type: 'prescription',
    category: 'heart',
    status: 'refill',
    prescription: {
      doctor: 'Dr. Maria Santos',
      date: '2023-02-20',
      refills: 0,
      expiryDate: '2023-08-20',
      instructions: 'Take 1 tablet daily at bedtime',
    },
    price: 250.0,
    image: '/images/atorvastatin.jpg',
  },
  {
    id: 4,
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    dosage: '500mg',
    type: 'otc',
    category: 'pain',
    status: 'active',
    price: 50.0,
    image: '/images/paracetamol.jpg',
  },
  {
    id: 5,
    name: 'Cetirizine',
    genericName: 'Cetirizine Hydrochloride',
    dosage: '10mg',
    type: 'otc',
    category: 'allergy',
    status: 'active',
    price: 75.0,
    image: '/images/cetirizine.jpg',
  },
];

const orders: Order[] = [
  {
    id: 101,
    medications: [
      {
        id: 1,
        name: 'Metformin 500mg',
        dosage: '500mg',
        quantity: 60,
        price: 150.0,
      },
      {
        id: 2,
        name: 'Losartan 50mg',
        dosage: '50mg',
        quantity: 30,
        price: 200.0,
      },
    ],
    status: 'processing',
    date: '2023-04-01',
    totalPrice: 350.0,
    estimatedDelivery: '2023-04-04',
  },
  {
    id: 102,
    medications: [
      {
        id: 4,
        name: 'Paracetamol 500mg',
        dosage: '500mg',
        quantity: 20,
        price: 50.0,
      },
    ],
    status: 'shipped',
    date: '2023-03-25',
    totalPrice: 50.0,
    estimatedDelivery: '2023-03-28',
    trackingNumber: 'TRK12345678',
  },
  {
    id: 103,
    medications: [
      {
        id: 2,
        name: 'Losartan 50mg',
        dosage: '50mg',
        quantity: 30,
        price: 200.0,
      },
      {
        id: 3,
        name: 'Atorvastatin 20mg',
        dosage: '20mg',
        quantity: 30,
        price: 250.0,
      },
      {
        id: 5,
        name: 'Cetirizine 10mg',
        dosage: '10mg',
        quantity: 10,
        price: 75.0,
      },
    ],
    status: 'delivered',
    date: '2023-03-15',
    totalPrice: 525.0,
  },
];

export default function PharmacyPage() {
  const [activeTab, setActiveTab] = useState<'my-meds' | 'shop' | 'orders'>('my-meds');
  const [cartItems, setCartItems] = useState<{ medication: Medication; quantity: number }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<MedicationType | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<MedicationCategory | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<MedicationStatus | 'all'>('all');

  const filteredMedications = medications.filter((med) => {
    // Filter by search query
    if (
      searchQuery &&
      !med.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !med.genericName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by type
    if (filterType !== 'all' && med.type !== filterType) {
      return false;
    }

    // Filter by category
    if (filterCategory !== 'all' && med.category !== filterCategory) {
      return false;
    }

    // Filter by status
    if (filterStatus !== 'all' && med.status !== filterStatus) {
      return false;
    }

    return true;
  });

  const handleAddToCart = (medication: Medication) => {
    const existingCartItem = cartItems.find((item) => item.medication.id === medication.id);

    if (existingCartItem) {
      setCartItems(
        cartItems.map((item) =>
          item.medication.id === medication.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { medication, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (medicationId: number) => {
    setCartItems(cartItems.filter((item) => item.medication.id !== medicationId));
  };

  const handleUpdateQuantity = (medicationId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(medicationId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.medication.id === medicationId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.medication.price * item.quantity,
    0
  );

  return (
    <MainLayout title="Pharmacy">
      <div className="mb-6">
        <div className="bg-white rounded-lg shadow p-1">
          <div className="grid grid-cols-3 gap-1">
            <button
              className={`py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'my-meds'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('my-meds')}
            >
              My Medications
            </button>
            <button
              className={`py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'shop'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('shop')}
            >
              Shop Medicines
            </button>
            <button
              className={`py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('orders')}
            >
              My Orders
            </button>
          </div>
        </div>
      </div>

      {/* My Medications Tab */}
      {activeTab === 'my-meds' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>My Prescriptions</CardTitle>
                  <Button variant="outline" size="sm" icon={<Plus className="h-4 w-4" />}>
                    Add Prescription
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search medications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <Button
                    variant={filterStatus === 'all' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === 'active' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('active')}
                  >
                    Active
                  </Button>
                  <Button
                    variant={filterStatus === 'refill' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('refill')}
                  >
                    Needs Refill
                  </Button>
                  <Button
                    variant={filterStatus === 'expired' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterStatus('expired')}
                  >
                    Expired
                  </Button>
                </div>

                <div className="space-y-4">
                  {filteredMedications
                    .filter((med) => med.type === 'prescription')
                    .map((medication) => (
                      <div
                        key={medication.id}
                        className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="p-4 flex items-start gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                            {medication.image ? (
                              <img
                                src={medication.image}
                                alt={medication.name}
                                className="w-full h-full object-cover rounded-md"
                              />
                            ) : (
                              <Pill className="h-8 w-8 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">{medication.name}</h3>
                                <p className="text-sm text-gray-600">
                                  {medication.genericName} • {medication.dosage}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  medication.status === 'active'
                                    ? 'success'
                                    : medication.status === 'refill'
                                    ? 'warning'
                                    : 'danger'
                                }
                                rounded
                              >
                                {medication.status === 'active'
                                  ? 'Active'
                                  : medication.status === 'refill'
                                  ? 'Needs Refill'
                                  : 'Expired'}
                              </Badge>
                            </div>
                            {medication.prescription && (
                              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
                                <div>
                                  <span className="block text-gray-500">Prescribed by</span>
                                  <span>{medication.prescription.doctor}</span>
                                </div>
                                <div>
                                  <span className="block text-gray-500">Date</span>
                                  <span>{medication.prescription.date}</span>
                                </div>
                                <div>
                                  <span className="block text-gray-500">Refills</span>
                                  <span>{medication.prescription.refills} remaining</span>
                                </div>
                                <div>
                                  <span className="block text-gray-500">Expires</span>
                                  <span>{medication.prescription.expiryDate}</span>
                                </div>
                              </div>
                            )}
                            <div className="mt-3 bg-gray-50 p-2 rounded text-sm">
                              <p className="font-medium text-gray-900">Instructions:</p>
                              <p className="text-gray-600">
                                {medication.prescription?.instructions}
                              </p>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleAddToCart(medication)}
                              >
                                Order Refill
                              </Button>
                              <Button variant="outline" size="sm">
                                Medication Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  {filteredMedications.filter((med) => med.type === 'prescription').length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-2">No medications found</p>
                      <Button variant="outline" size="sm" icon={<Plus className="h-4 w-4" />}>
                        Add a New Prescription
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Medication Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Today</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Morning</p>
                            <p className="text-xs text-gray-600">8:00 AM - After breakfast</p>
                          </div>
                          <Badge variant="success" rounded>
                            Taken
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <Pill className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="text-sm">Metformin 500mg - 1 tablet</span>
                            <div className="ml-2 h-4 w-4 bg-gray-200 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Evening</p>
                            <p className="text-xs text-gray-600">8:00 PM - After dinner</p>
                          </div>
                          <Badge variant="warning" rounded>
                            Upcoming
                          </Badge>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <Pill className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="text-sm">Metformin 500mg - 1 tablet</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                              <Pill className="h-3 w-3 text-red-600" />
                            </div>
                            <span className="text-sm">Losartan 50mg - 1 tablet</span>
                          </div>
                          <div className="flex items-center">
                            <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                              <Pill className="h-3 w-3 text-yellow-600" />
                            </div>
                            <span className="text-sm">Atorvastatin 20mg - 1 tablet</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Medication Supply</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-900">Metformin 500mg</p>
                          <p className="text-sm text-gray-600">24 days left</p>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-900">Losartan 50mg</p>
                          <p className="text-sm text-gray-600">5 days left</p>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-900">Atorvastatin 20mg</p>
                          <p className="text-sm text-gray-600">2 days left</p>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-200 pt-4">
                <Button variant="outline" fullWidth icon={<Clock className="h-4 w-4" />}>
                  Reminder Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {/* Shop Medicines Tab */}
      {activeTab === 'shop' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Shop Medications</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Filter className="h-4 w-4" />}
                    >
                      Filters
                    </Button>
                    <Button variant="outline" size="sm">
                      Sort by
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search medications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <Button
                    variant={filterType === 'all' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterType === 'prescription' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('prescription')}
                  >
                    Prescription
                  </Button>
                  <Button
                    variant={filterType === 'otc' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType('otc')}
                  >
                    Over-the-Counter
                  </Button>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <Button
                    variant={filterCategory === 'all' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory('all')}
                  >
                    All Categories
                  </Button>
                  <Button
                    variant={filterCategory === 'heart' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory('heart')}
                  >
                    Heart
                  </Button>
                  <Button
                    variant={filterCategory === 'diabetes' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory('diabetes')}
                  >
                    Diabetes
                  </Button>
                  <Button
                    variant={filterCategory === 'pain' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory('pain')}
                  >
                    Pain Relief
                  </Button>
                  <Button
                    variant={filterCategory === 'allergy' ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={() => setFilterCategory('allergy')}
                  >
                    Allergies
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredMedications.map((medication) => (
                    <div
                      key={medication.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                          {medication.image ? (
                            <img
                              src={medication.image}
                              alt={medication.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <Pill className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900">{medication.name}</h3>
                              <p className="text-sm text-gray-600">
                                {medication.genericName} • {medication.dosage}
                              </p>
                            </div>
                            <Badge
                              variant={medication.type === 'prescription' ? 'primary' : 'secondary'}
                              rounded
                              size="sm"
                            >
                              {medication.type === 'prescription' ? 'Rx' : 'OTC'}
                            </Badge>
                          </div>
                          <div className="mt-2 flex justify-between items-center">
                            <p className="font-bold text-gray-900">₱{medication.price.toFixed(2)}</p>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleAddToCart(medication)}
                              icon={<ShoppingCart className="h-4 w-4" />}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>
                  Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.medication.id} className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center">
                          {item.medication.image ? (
                            <img
                              src={item.medication.image}
                              alt={item.medication.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <Pill className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">
                                {item.medication.name}
                              </h4>
                              <p className="text-xs text-gray-600">{item.medication.dosage}</p>
                            </div>
                            <button
                              className="text-gray-400 hover:text-gray-700"
                              onClick={() => handleRemoveFromCart(item.medication.id)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-2 flex justify-between items-center">
                            <div className="flex items-center border rounded-md">
                              <button
                                className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                                onClick={() =>
                                  handleUpdateQuantity(item.medication.id, item.quantity - 1)
                                }
                              >
                                -
                              </button>
                              <span className="px-2 text-sm">{item.quantity}</span>
                              <button
                                className="px-2 py-1 text-gray-500 hover:bg-gray-100"
                                onClick={() =>
                                  handleUpdateQuantity(item.medication.id, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                            <p className="text-sm font-medium">
                              ₱{(item.medication.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="text-sm font-medium">₱{cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Delivery Fee</span>
                        <span className="text-sm font-medium">₱50.00</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>₱{(cartTotal + 50).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t border-gray-200 pt-4">
                <Button
                  variant="primary"
                  fullWidth
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Delivery Address</h3>
                    <p className="text-sm text-gray-600">
                      123 Bonifacio St., Brgy. San Jose
                      <br />
                      Quezon City, Metro Manila
                      <br />
                      Philippines, 1116
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Delivery Options</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="standard"
                          name="delivery"
                          className="form-radio text-primary focus:ring-primary"
                          defaultChecked
                        />
                        <label htmlFor="standard" className="ml-2 block text-sm text-gray-900">
                          Standard (2-3 days) - ₱50
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="express"
                          name="delivery"
                          className="form-radio text-primary focus:ring-primary"
                        />
                        <label htmlFor="express" className="ml-2 block text-sm text-gray-900">
                          Express (24 hours) - ₱100
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* My Orders Tab */}
      {activeTab === 'orders' && (
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent className="px-0 py-0">
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">Placed on {order.date}</p>
                    </div>
                    <Badge
                      variant={
                        order.status === 'processing'
                          ? 'primary'
                          : order.status === 'shipped'
                          ? 'warning'
                          : 'success'
                      }
                      rounded
                      className="capitalize"
                    >
                      {order.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-3">
                    {order.medications.map((med) => (
                      <div key={med.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Pill className="h-4 w-4 text-gray-400 mr-2" />
                          <span>
                            {med.name} ({med.quantity}x)
                          </span>
                        </div>
                        <span className="font-medium">₱{med.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      {order.status === 'processing' && `Estimated delivery: ${order.estimatedDelivery}`}
                      {order.status === 'shipped' && `Tracking number: ${order.trackingNumber}`}
                      {order.status === 'delivered' && 'Order completed'}
                    </div>
                    <div className="font-medium">Total: ₱{order.totalPrice.toFixed(2)}</div>
                  </div>

                  <div className="mt-3 flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Order Details
                    </Button>
                    {order.status === 'shipped' && (
                      <Button variant="primary" size="sm" icon={<Package className="h-4 w-4" />}>
                        Track Order
                      </Button>
                    )}
                    {order.status === 'delivered' && (
                      <Button variant="primary" size="sm">
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </MainLayout>
  );
}