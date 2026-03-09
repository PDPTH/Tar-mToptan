## 15. Sepete Ürün Ekleme
- **Endpoint:** `POST /cart/items`
- **Request Body:** 
```json
{
  "productId": "prd_123",
  "quantity": 2
}
```
- **Authentication:** Bearer Token gerekli
- **Response:** `201 Created` - Ürün sepete başarıyla eklendi

## 16. Sepetten Ürün Çıkarma
- **Endpoint:** `DELETE /cart/items/{itemId}`
- **Path Parameters:** 
  - `itemId` (string, required) - Sepet öğesi ID'si
- **Authentication:** Bearer Token gerekli
- **Response:** `204 No Content` - Ürün sepetten başarıyla çıkarıldı

## 17. Sepeti Görüntüleme
- **Endpoint:** `GET /cart`
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Sepet bilgileri başarıyla getirildi

## 18. Sipariş Oluşturma
- **Endpoint:** `POST /orders`
- **Request Body:** 
```json
{
  "addressId": "addr_123",
  "paymentMethod": "credit_card",
  "notes": "Kapıya bırakılabilir."
}
```
- **Authentication:** Bearer Token gerekli
- **Response:** `201 Created` - Sipariş başarıyla oluşturuldu

## 19. Sipariş İptal Etme
- **Endpoint:** `DELETE /orders/{orderId}`
- **Path Parameters:** 
  - `orderId` (string, required) - Sipariş ID'si
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Sipariş başarıyla iptal edildi

## 20. Teslimat Adresi Ekleme
- **Endpoint:** `POST /addresses`
- **Request Body:** 
```json
{
  "title": "Ev",
  "fullName": "Ahmet Yılmaz",
  "phone": "+905551234567",
  "city": "İstanbul",
  "district": "Kadıköy",
  "addressLine": "Örnek Mah. Örnek Sok. No:12 Daire:4",
  "postalCode": "34710"
}
```
- **Authentication:** Bearer Token gerekli
- **Response:** `201 Created` - Teslimat adresi başarıyla eklendi

## 21. Teslimat Adresi Güncelleme
- **Endpoint:** `PUT /addresses/{addressId}`
- **Path Parameters:** 
  - `addressId` (string, required) - Adres ID'si
- **Request Body:** 
```json
{
  "title": "İş Yeri",
  "fullName": "Ahmet Yılmaz",
  "phone": "+905551234567",
  "city": "İstanbul",
  "district": "Beşiktaş",
  "addressLine": "Barbaros Bulvarı No:45",
  "postalCode": "34353"
}
```
- **Authentication:** Bearer Token gerekli
- **Response:** `200 OK` - Teslimat adresi başarıyla güncellendi
