import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import "./products.css";
import {
  getAllProducts,
  errorMessage,
  money,
  useGuestCheckout,
} from "./productlogic";
import { useCartContext } from "../../context/cartcontext";

/* ============================================================
   Products.jsx
   Products page with all UI components in one file
   ============================================================ */

// ------------------------------------------------------------
// Field
// ------------------------------------------------------------

function Field({ label, icon, children }) {
  return (
    <label className="tp-field">
      <span className="tp-field__label">
        {icon}
        {label}
      </span>
      {React.cloneElement(children, { className: "tp-input" })}
    </label>
  );
}

// ------------------------------------------------------------
// Hero
// ------------------------------------------------------------

function Hero({ products, loading }) {
  const inStock = products.filter((p) => p.qty > 0).length;

  return (
    <section className="tp-hero">
      <div className="tp-container tp-hero__inner">
        <div className="tp-hero__text">
          <h2 className="tp-hero__title">
            Trusted brands, delivered on time to your shop.
          </h2>

          <p className="tp-hero__lead">
            Food products and everyday essentials for retailers and businesses
            across Madurai. Pick what you need, add it to your cart and confirm
            the order on WhatsApp.
          </p>

          {/* <a href="#products" className="tp-btn  tp-btn--primary">
            Browse products
            <ArrowDown size={18} />
          </a> */}
        </div>

        <dl className="tp-hero__facts">
          <div className="tp-fact">
            <Package size={22} />
            <dt>Products listed</dt>
            <dd>{loading ? "–" : products.length}</dd>
          </div>

          <div className="tp-fact">
            <CheckCircle2 size={22} />
            <dt>Ready to ship</dt>
            <dd>{loading ? "–" : inStock}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Toolbar
// ------------------------------------------------------------

function Toolbar({
  search, onSearch,
  sort, onSort,
  stockFilter, onStockFilter,
  resultCount,
}) {
  return (
    <div className="tp-toolbar">
      <div className="tp-toolbar__title">
        <h2>Products</h2>
        <p>{resultCount} {resultCount === 1 ? "item" : "items"} found</p>
      </div>

      <div className="tp-toolbar__controls">
        <label className="tp-search">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by name or code"
            aria-label="Search products"
          />
        </label>

        <select
          className="tp-select"
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          aria-label="Sort products"
        >
          <option value="latest">Latest</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>

        <select
          className="tp-select"
          value={stockFilter}
          onChange={(e) => onStockFilter(e.target.value)}
          aria-label="Filter by stock"
        >
          <option value="all">All stock</option>
          <option value="available">In stock</option>
          <option value="out">Out of stock</option>
        </select>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// ProductCard
// ------------------------------------------------------------

function ProductCard({ product, cartQty, onAdd }) {
  const outOfStock = product.qty <= 0;

  return (
    <article className={`tp-card ${outOfStock ? "is-out" : ""}`}>
      <div className="tp-card__media">
        <img
          src={product.image?.url}
          alt={product.productName}
          loading="lazy"
        />
        <span className="tp-card__code">{product.productCode}</span>
        {outOfStock && <span className="tp-card__badge">Out of stock</span>}
      </div>

      <div className="tp-card__body">
        <h3 className="tp-card__name">{product.productName}</h3>

        <div className="tp-card__meta">
          <span className="tp-card__price">{money(product.price)}</span>
          <span className="tp-card__stock">
            {outOfStock ? "Unavailable" : `${product.qty} available`}
          </span>
        </div>

        <button
          type="button"
          className="tp-btn tp-btn--primary tp-btn--block"
          disabled={outOfStock}
          onClick={() => onAdd(product)}
        >
          <Plus size={16} />
          {cartQty ? `Add more (${cartQty} in cart)` : "Add to cart"}
        </button>
      </div>
    </article>
  );
}

// ------------------------------------------------------------
// ProductGrid
// ------------------------------------------------------------

function ProductGrid({ products, cart, loading, error, onRetry, onAdd }) {
  return (
    <>
      {error && (
        <div className="tp-alert tp-alert--error" role="alert">
          <span>{error}</span>
          <button type="button" className="tp-link-btn" onClick={onRetry}>
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div className="tp-state">
          <LoaderCircle className="tp-spin" size={34} />
          <p>Loading products…</p>
        </div>
      ) : products.length === 0 ? (
        <div className="tp-state tp-state--box">
          <Package size={40} />
          <h3>No products found</h3>
          <p>Try a different name or clear the stock filter.</p>
        </div>
      ) : (
        <div className="tp-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              cartQty={cart.find((item) => item._id === product._id)?.qty}
              onAdd={onAdd}
            />
          ))}
        </div>
      )}
    </>
  );
}

// ------------------------------------------------------------
// CartDrawer
// ------------------------------------------------------------

function CartDrawer({
  open, onClose, items, count, total, onUpdateQty, onRemove, onCheckout,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="tp-overlay tp-overlay--right" onClick={onClose}>
      <aside
        className="tp-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tp-drawer__head">
          <div>
            <h2>Your cart</h2>
            <p>{count} {count === 1 ? "item" : "items"}</p>
          </div>
          <button type="button" className="tp-icon-btn" onClick={onClose} aria-label="Close cart">
            <X />
          </button>
        </div>

        <div className="tp-drawer__body">
          {items.length === 0 ? (
            <div className="tp-state">
              <ShoppingBag size={46} />
              <h3>Your cart is empty</h3>
              <p>Add products from the list to start an order.</p>
              <button type="button" className="tp-btn tp-btn--primary" onClick={onClose}>
                Continue shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="tp-line">
                <img src={item.image?.url} alt={item.productName} className="tp-line__img" />

                <div className="tp-line__info">
                  <h3>{item.productName}</h3>
                  <p className="tp-line__price">{money(item.price)}</p>

                  <div className="tp-qty">
                    <button type="button" onClick={() => onUpdateQty(item._id, -1)} aria-label="Decrease quantity">
                      <Minus size={13} />
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      disabled={item.qty >= item.stock}
                      onClick={() => onUpdateQty(item._id, 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>

                    <button
                      type="button"
                      className="tp-qty__remove"
                      onClick={() => onRemove(item._id)}
                      aria-label={`Remove ${item.productName}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="tp-line__sub">Subtotal: {money(item.price * item.qty)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="tp-drawer__foot">
            <div className="tp-total">
              <span>Subtotal</span>
              <strong>{money(total)}</strong>
            </div>
            <button type="button" className="tp-btn tp-btn--primary tp-btn--block tp-btn--lg" onClick={onCheckout}>
              Proceed to checkout
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

// ------------------------------------------------------------
// StepRegistered
// ------------------------------------------------------------

function StepRegistered({ user }) {
  return (
    <div className="tp-step">
      <div className="tp-note tp-note--ok">
        <CheckCircle2 />
        <div>
          <strong>Registered customer</strong>
          <p>No OTP required.</p>
        </div>
      </div>

      <div className="tp-panel tp-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.phoneNo}</p>
      </div>

      <p className="tp-muted">
        Registered checkout has not been connected yet because its order route
        and address response structure have not been provided.
      </p>
    </div>
  );
}

// ------------------------------------------------------------
// StepDetails
// ------------------------------------------------------------

function StepDetails({ form, onChange, onSendOtp, busy }) {
  return (
    <div className="tp-step">
      <h3>Contact details</h3>
      <p className="tp-muted">Enter your email and mobile number to continue.</p>

      <div className="tp-form-grid">
        <Field label="Email address" icon={<Mail size={16} />}>
          <input type="email" name="email" value={form.email} onChange={onChange} placeholder="your@email.com" />
        </Field>

        <Field label="Mobile number" icon={<Phone size={16} />}>
          <input type="tel" name="mobile" value={form.mobile} onChange={onChange} placeholder="10 digit mobile number" maxLength={10} />
        </Field>
      </div>

      <button type="button" className="tp-btn tp-btn--primary tp-btn--block tp-btn--lg" onClick={onSendOtp} disabled={busy}>
        {busy ? <LoaderCircle className="tp-spin" /> : <ShieldCheck size={18} />}
        Send email OTP
      </button>
    </div>
  );
}

// ------------------------------------------------------------
// StepOtp
// ------------------------------------------------------------

function StepOtp({ form, onChange, onVerify, onBack, busy }) {
  return (
    <div className="tp-step">
      <h3>Verify your email</h3>
      <p className="tp-muted">Enter the OTP sent to {form.email}.</p>

      <input
        name="otp"
        value={form.otp}
        onChange={onChange}
        placeholder="Enter OTP"
        maxLength={6}
        inputMode="numeric"
        autoComplete="one-time-code"
        className="tp-input tp-input--otp"
      />

      <button
        type="button"
        className="tp-btn tp-btn--primary tp-btn--block tp-btn--lg"
        onClick={onVerify}
        disabled={busy || !form.otp.trim()}
      >
        {busy ? <LoaderCircle className="tp-spin" /> : <ShieldCheck size={18} />}
        Verify OTP
      </button>

      <button type="button" className="tp-link-btn tp-link-btn--center" onClick={onBack}>
        Change email or mobile
      </button>
    </div>
  );
}

// ------------------------------------------------------------
// StepAddress
// ------------------------------------------------------------

function StepAddress({
  form, onChange, busy,
  customerType, guestAddresses, addressId, useNewAddress,
  onSelectAddress, onSubmit,
}) {
  const isExisting = customerType === "existing_guest";
  const showForm = !isExisting || useNewAddress || guestAddresses.length === 0;

  return (
    <div className="tp-step">
      <h3>Delivery details</h3>

      {isExisting && guestAddresses.length > 0 && (
        <div className="tp-saved">
          <p className="tp-saved__title">Select a saved address</p>

          {guestAddresses.map((address) => {
            const active = !useNewAddress && addressId === address._id;
            return (
              <button
                key={address._id}
                type="button"
                className={`tp-address ${active ? "is-active" : ""}`}
                onClick={() => onSelectAddress(address._id)}
              >
                <MapPin size={18} />
                <span className="tp-address__text">
                  <strong>{address.addressLine}</strong>
                  <small>
                    {address.city}, {address.district}, {address.state} - {address.pincode}
                  </small>
                </span>
                {active && <CheckCircle2 size={19} />}
              </button>
            );
          })}
        </div>
      )}

      <div className="tp-form-grid">
        <Field label="Full name">
          <input name="name" value={form.name} onChange={onChange} placeholder="Your name" />
        </Field>

        <Field label="Shop name (optional)">
          <input name="shopName" value={form.shopName} onChange={onChange} placeholder="Shop name" />
        </Field>
      </div>

      {showForm && (
        <div className="tp-form-stack">
          <Field label="Address">
            <textarea name="addressLine" value={form.addressLine} onChange={onChange} placeholder="Door number, street, area" rows={2} />
          </Field>

          <div className="tp-form-grid">
            <Field label="City">
              <input name="city" value={form.city} onChange={onChange} placeholder="City" />
            </Field>
            <Field label="District">
              <input name="district" value={form.district} onChange={onChange} placeholder="District" />
            </Field>
            <Field label="State">
              <input name="state" value={form.state} onChange={onChange} />
            </Field>
            <Field label="Pincode">
              <input name="pincode" value={form.pincode} onChange={onChange} placeholder="6 digit pincode" maxLength={6} inputMode="numeric" />
            </Field>
          </div>
        </div>
      )}

      <button type="button" className="tp-btn tp-btn--primary tp-btn--block tp-btn--lg" onClick={onSubmit} disabled={busy}>
        {busy ? <LoaderCircle className="tp-spin" /> : <ArrowRight size={18} />}
        Continue to WhatsApp order
      </button>
    </div>
  );
}

// ------------------------------------------------------------
// CheckoutModal
// ------------------------------------------------------------

function CheckoutModal({ checkout, user, cartCount, total }) {
  const {
    open, step, setStep, busy, error, form, updateForm,
    customerType, guestAddresses, addressId, useNewAddress,
    closeCheckout, sendOtp, verifyOtp, selectAddress, submitGuestCheckout,
  } = checkout;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && closeCheckout();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeCheckout]);

  if (!open) return null;

  return (
    <div className="tp-overlay tp-overlay--center" onClick={closeCheckout}>
      <div
        className="tp-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tp-modal__head">
          <div>
            <p>Thirupathi Agencies</p>
            <h2>Checkout</h2>
          </div>
          <button type="button" className="tp-icon-btn tp-icon-btn--light" onClick={closeCheckout} aria-label="Close checkout">
            <X />
          </button>
        </div>

        <div className="tp-modal__body">
          <div className="tp-summary">
            <div>
              <span>Order total</span>
              <strong>{money(total)}</strong>
            </div>
            <div className="tp-summary__right">
              <span>{cartCount} {cartCount === 1 ? "item" : "items"}</span>
              <span>WhatsApp order</span>
            </div>
          </div>

          {error && <div className="tp-alert tp-alert--error" role="alert">{error}</div>}

          {user && step === "registered" && <StepRegistered user={user} />}

          {!user && step === "details" && (
            <StepDetails form={form} onChange={updateForm} onSendOtp={sendOtp} busy={busy} />
          )}

          {!user && step === "otp" && (
            <StepOtp
              form={form}
              onChange={updateForm}
              onVerify={verifyOtp}
              onBack={() => setStep("details")}
              busy={busy}
            />
          )}

          {!user && step === "address" && (
            <StepAddress
              form={form}
              onChange={updateForm}
              busy={busy}
              customerType={customerType}
              guestAddresses={guestAddresses}
              addressId={addressId}
              useNewAddress={useNewAddress}
              onSelectAddress={selectAddress}
              onSubmit={submitGuestCheckout}
            />
          )}

          <p className="tp-footnote">
            Your order is created with pending status. Confirm it by sending the
            pre-filled WhatsApp message. No payment is collected on this screen.
          </p>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Toast
// ------------------------------------------------------------

function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="tp-toast" role="status">
      <CheckCircle2 size={17} />
      {message}
    </div>
  );
}

// ------------------------------------------------------------
// PRODUCTS PAGE (main)
// Header and Footer come from your site layout, not from this file.
// The cart is global: the Header reads it from CartProvider too.
// ------------------------------------------------------------

export default function Products({ user = null }) {
  // PRODUCTS
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productError, setProductError] = useState("");

  // FILTERS
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [stockFilter, setStockFilter] = useState("all");

  // TOAST
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2200);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  // GLOBAL CART
  const cart = useCartContext();

  const handleAdd = (product) => {
    const status = cart.add(product);
    if (status === "added") showToast(`${product.productName} added to cart`);
    if (status === "limit") showToast(`Only ${product.qty} available for ${product.productName}`);
  };

  // CHECKOUT
  const checkout = useGuestCheckout({
    user,
    cart: cart.items,
    onOrderCreated: () => {
      cart.clear();
      showToast("Your order has been created.");
    },
  });

  const handleCheckout = () => {
    cart.closeCart();
    checkout.openCheckout();
  };

  // FETCH
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setProductError("");

      const { data } = await getAllProducts();
      if (!data.success) throw new Error(data.message || "Unable to load products");

      setProducts(data.products || []);
    } catch (err) {
      setProductError(errorMessage(err, "Unable to load products"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // FILTER + SORT
  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    let result = products.filter((p) =>
      `${p.productName} ${p.productCode}`.toLowerCase().includes(term)
    );

    if (stockFilter === "available") result = result.filter((p) => p.qty > 0);
    if (stockFilter === "out") result = result.filter((p) => p.qty <= 0);

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);
    if (sort === "latest") {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return result;
  }, [products, search, sort, stockFilter]);

  return (
    <div className="tp-page">
      <Hero products={products} loading={loading} />

      <main id="products" className="tp-container tp-products">
        <Toolbar
          search={search} onSearch={setSearch}
          sort={sort} onSort={setSort}
          stockFilter={stockFilter} onStockFilter={setStockFilter}
          resultCount={filteredProducts.length}
        />

        <ProductGrid
          products={filteredProducts}
          cart={cart.items}
          loading={loading}
          error={productError}
          onRetry={fetchProducts}
          onAdd={handleAdd}
        />
      </main>

      <CartDrawer
        open={cart.cartOpen}
        onClose={cart.closeCart}
        items={cart.items}
        count={cart.count}
        total={cart.total}
        onUpdateQty={cart.updateQty}
        onRemove={cart.remove}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        checkout={checkout}
        user={user}
        cartCount={cart.count}
        total={cart.total}
      />

      <Toast message={toast} />
    </div>
  );
}