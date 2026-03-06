1. **Kayıt Olma**
   - **API Metodu:** `POST /auth/register`
   - **Açıklama:** Kullanıcıların sisteme yeni bir hesap oluşturarak kayıt olmasını sağlar. Kullanıcılar email adresi ve şifre belirleyerek hesap oluşturabilir. Kayıt işlemi sırasında gerekli kullanıcı bilgileri sisteme kaydedilir.

2. **Giriş Yapma**
   - **API Metodu:** `POST /auth/login`
   - **Açıklama:** Kullanıcıların mevcut hesap bilgileri ile sisteme giriş yapmasını sağlar. Kullanıcı email ve şifre bilgilerini girerek kimlik doğrulaması yapar. Doğrulama başarılı olduğunda kullanıcı sisteme erişim sağlayabilir.

3. **Profil Görüntüleme**
   - **API Metodu:** `GET /users/{userId}`
   - **Açıklama:** Kullanıcının profil bilgilerini görüntülemesini sağlar. Kullanıcı adı, email, telefon gibi kişisel bilgiler ve hesap durumu gösterilir. Kullanıcılar kendi profil bilgilerini görüntüleyebilir veya yöneticiler diğer kullanıcıların bilgilerini inceleyebilir. Güvenlik için giriş yapmış olmak gerekir.

4. **Profil Güncelleme**
   - **API Metodu:** `PUT /users/{userId}`
   - **Açıklama:** Kullanıcının profil bilgilerini güncellemesini sağlar. Kullanıcılar ad, soyad, email ve telefon gibi kişisel bilgilerini değiştirebilir. Güvenlik için giriş yapmış olmak gerekir ve kullanıcılar yalnızca kendi bilgilerini güncelleyebilir.

5. **Hesap Silme**
   - **API Metodu:** `DELETE /users/{userId}`
   - **Açıklama:** Kullanıcının hesabını sistemden kalıcı olarak silmesini sağlar. Kullanıcı hesabını kapatmak istediğinde veya yönetici tarafından hesap kapatılması gerektiğinde kullanılır. Bu işlem geri alınamaz ve kullanıcının tüm verileri silinir.

6. **Üreticileri Listeleme**
   - **API Metodu:** `GET /producers`
   - **Açıklama:** Sistemde kayıtlı olan üreticilerin listesini görüntülemeyi sağlar. Kullanıcılar üreticiler hakkında genel bilgilere erişebilir ve mevcut üreticileri inceleyebilir.

7. **Üretici Detayını Görüntüleme**
   - **API Metodu:** `GET /producers/{producerId}`
   - **Açıklama:** Belirli bir üreticinin detaylı bilgilerini görüntülemeyi sağlar. Kullanıcılar üreticinin adı, iletişim bilgileri ve sunduğu ürünler gibi detaylara erişebilir.
