import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById, createReview } from '../modules/umut/productService'
import { addToCart } from '../modules/aykhan/cartService'
import { sampleProducts } from '../utils/sampleData'
import { useAuth } from '../context/AuthContext.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import toast from 'react-hot-toast'
import { FiShoppingCart, FiStar, FiSend } from 'react-icons/fi'

const categoryEmoji = {
    'Sebze': '🥬', 'Meyve': '🍎', 'Bakliyat': '🫘', 'Tahıl': '🌾', 'default': '🌿',
}

export default function ProductDetailPage() {
    const { productId } = useParams()
    const { isAuthenticated } = useAuth()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [addingToCart, setAddingToCart] = useState(false)

    // Review form
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
    const [submittingReview, setSubmittingReview] = useState(false)

    useEffect(() => {
        async function fetchProduct() {
            setLoading(true)
            try {
                const data = await getProductById(productId)
                setProduct(data)
            } catch (err) {
                console.error('Ürün yüklenemedi, örnek veri aranıyor:', err)
                const sample = sampleProducts.find(p => p.id === productId)
                if (sample) setProduct(sample)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [productId])

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            toast.error('Sepete eklemek için giriş yapmalısınız.')
            return
        }
        setAddingToCart(true)
        try {
            await addToCart(productId, quantity)
            toast.success('Ürün sepete eklendi!')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Sepete eklenemedi.')
        } finally {
            setAddingToCart(false)
        }
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault()
        if (!reviewForm.comment.trim()) {
            toast.error('Yorum yazmalısınız.')
            return
        }
        setSubmittingReview(true)
        try {
            await createReview(productId, reviewForm)
            toast.success('Değerlendirmeniz eklendi!')
            setReviewForm({ rating: 5, comment: '' })
        } catch (err) {
            toast.error(err.response?.data?.message || 'Değerlendirme eklenemedi.')
        } finally {
            setSubmittingReview(false)
        }
    }

    if (loading) return <LoadingSpinner text="Ürün detayı yükleniyor..." />

    if (!product) {
        return (
            <div className="empty-state">
                <div className="empty-icon">😕</div>
                <h3>Ürün bulunamadı</h3>
                <Link to="/products" className="btn btn-primary" style={{ marginTop: '16px' }}>
                    Ürünlere Dön
                </Link>
            </div>
        )
    }

    const emoji = categoryEmoji[product.category] || categoryEmoji.default

    return (
        <div className="animate-in">
            <div className="detail-layout">
                {/* Image */}
                <div className="detail-image">
                    <span>{emoji}</span>
                </div>

                {/* Info */}
                <div className="detail-info">
                    {product.category && (
                        <span className="product-card-category">{product.category}</span>
                    )}
                    <h1>{product.name}</h1>
                    <div className="detail-price">₺{product.price?.toFixed(2)}</div>

                    <p className="detail-description">
                        {product.description || 'Bu ürün hakkında henüz açıklama eklenmemiş.'}
                    </p>

                    <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                        {product.stock > 0 ? `${product.stock} adet stokta` : 'Tükendi'}
                    </span>

                    {product.stock > 0 && (
                        <div className="detail-actions" style={{ marginTop: '24px' }}>
                            <div className="quantity-control">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
                            </div>
                            <button
                                id="add-to-cart"
                                className="btn btn-accent btn-lg"
                                onClick={handleAddToCart}
                                disabled={addingToCart}
                            >
                                <FiShoppingCart /> {addingToCart ? 'Ekleniyor...' : 'Sepete Ekle'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews Section */}
            {isAuthenticated && (
                <section className="section">
                    <h2 className="section-title" style={{ marginBottom: '16px' }}>
                        <FiStar /> Değerlendirme Yap
                    </h2>
                    <div className="card">
                        <form onSubmit={handleReviewSubmit}>
                            <div className="form-group">
                                <label className="form-label">Puan</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                fontSize: '1.5rem',
                                                cursor: 'pointer',
                                                color: star <= reviewForm.rating ? 'var(--color-accent)' : 'var(--color-text-muted)',
                                            }}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Yorumunuz</label>
                                <textarea
                                    id="review-comment"
                                    className="form-input"
                                    placeholder="Bu ürün hakkında düşüncelerinizi yazın..."
                                    value={reviewForm.comment}
                                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                />
                            </div>
                            <button id="review-submit" type="submit" className="btn btn-primary" disabled={submittingReview}>
                                <FiSend /> {submittingReview ? 'Gönderiliyor...' : 'Değerlendirmeyi Gönder'}
                            </button>
                        </form>
                    </div>
                </section>
            )}
        </div>
    )
}
