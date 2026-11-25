import axios from "axios";
import { useState } from "react";

/* ============================================================
   productsLogic.js
   API calls, helpers and hooks for the Products page
   ============================================================ */

// ---------------------------------------------------------------
// API
// ---------------------------------------------------------------

const API = import.meta.env.VITE_API_URL;

// All endpoints live under /api/auth — change this one line if the prefix changes.
export const AUTH_API = `${API}/api/auth`;

const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const getAllProducts = () => axios.get(`${AUTH_API}/guest-orders/products/get-all`);

export const sendGuestOtp = (payload) =>
  axios.post(`${AUTH_API}/guest-checkout/send-otp`, payload);

export const verifyGuestOtp = (payload) =>
  axios.post(`${AUTH_API}/guest-checkout/verify-otp`, payload);

export const registerGuestCustomer = (payload, token) =>
  axios.post(`${AUTH_API}/guest-checkout/register`, payload, authHeader(token));

export const createGuestOrder = (payload, token) =>
  axios.post(`${AUTH_API}/guest-orders/create`, payload, authHeader(token));

export const errorMessage = (err, fallback) =>
  err?.response?.data?.message || err?.message || fallback;

// ---------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------

export const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value || 0);

// ---------------------------------------------------------------
// HOOK: GUEST CHECKOUT (OTP, address, order)
// ---------------------------------------------------------------

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  shopName: "",
  addressLine: "",
  city: "",
  district: "",
  state: "Tamil Nadu",
  pincode: "",
  otp: "",
};

const addressFields = (address = {}) => ({
  addressLine: address.addressLine || "",
  city: address.city || "",
  district: address.district || "",
  state: address.state || "Tamil Nadu",
  pincode: address.pincode || "",
});

export function useGuestCheckout({ user, cart, onOrderCreated }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("details");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [checkoutToken, setCheckoutToken] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [guestAddresses, setGuestAddresses] = useState([]);
  const [addressId, setAddressId] = useState("");
  const [useNewAddress, setUseNewAddress] = useState(false);

  const [form, setForm] = useState({
    ...initialForm,
    name: user?.name || "",
    email: user?.email || "",
    mobile: user?.phoneNo || "",
  });

  const updateForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openCheckout = () => {
    if (!cart.length) return;
    setError("");
    setStep(user ? "registered" : "details");
    setOpen(true);
  };

  const closeCheckout = () => {
    setOpen(false);
    setError("");
  };

  // ---------- OTP ----------

  const sendOtp = async () => {
    if (!form.email || !form.mobile) return setError("Email and mobile number are required.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Enter a valid email address.");
    if (!/^[6-9]\d{9}$/.test(form.mobile)) return setError("Enter a valid 10 digit mobile number.");

    try {
      setBusy(true);
      setError("");
      await sendGuestOtp({
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile.trim(),
      });
      setStep("otp");
    } catch (err) {
      setError(errorMessage(err, "Unable to send OTP. Please try again."));
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async () => {
    if (!form.otp.trim()) return setError("Please enter OTP.");

    try {
      setBusy(true);
      setError("");

      const { data } = await verifyGuestOtp({
        email: form.email.trim().toLowerCase(),
        mobile: form.mobile.trim(),
        otp: form.otp.trim(),
      });

      if (!data.checkoutToken) throw new Error("Checkout token not received.");

      setCheckoutToken(data.checkoutToken);
      setCustomerType(data.customerType);

      if (data.customerType === "existing_guest") {
        const customer = data.customer;
        const addresses = customer?.addresses || [];
        const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

        setGuestAddresses(addresses);
        setForm((prev) => ({
          ...prev,
          name: customer?.name || "",
          shopName: customer?.shopName || "",
          ...(defaultAddress ? addressFields(defaultAddress) : {}),
        }));

        if (defaultAddress) {
          setAddressId(defaultAddress._id);
          setUseNewAddress(false);
        } else {
          setUseNewAddress(true);
        }
      } else {
        setGuestAddresses([]);
        setUseNewAddress(true);
      }

      setStep("address");
    } catch (err) {
      setError(errorMessage(err, "OTP verification failed."));
    } finally {
      setBusy(false);
    }
  };

  // ---------- ADDRESS ----------

  const selectAddress = (id) => {
    setUseNewAddress(false);
    setAddressId(id);

    const selected = guestAddresses.find((a) => a._id === id);
    if (selected) setForm((prev) => ({ ...prev, ...addressFields(selected) }));
  };

  const validateAddress = () => {
    const ok =
      form.name.trim() &&
      form.addressLine.trim() &&
      form.city.trim() &&
      form.district.trim() &&
      form.state.trim() &&
      /^\d{6}$/.test(form.pincode.trim());

    if (!ok) setError("Please complete all required address fields.");
    return Boolean(ok);
  };

  // ---------- ORDER ----------

  const placeGuestOrder = async (selectedAddressId) => {
    try {
      setBusy(true);
      setError("");

      const { data } = await createGuestOrder(
        {
          addressId: selectedAddressId,
          items: cart.map((item) => ({ productId: item._id, qty: item.qty })),
        },
        checkoutToken
      );

      if (!data.success) throw new Error(data.message || "Order creation failed.");

      setOpen(false);
      onOrderCreated?.();

      if (data.whatsappUrl) window.location.assign(data.whatsappUrl);
    } catch (err) {
      setError(errorMessage(err, "Unable to create order."));
    } finally {
      setBusy(false);
    }
  };

  const registerGuest = async () => {
    if (!validateAddress()) return;

    try {
      setBusy(true);
      setError("");

      const { data } = await registerGuestCustomer(
        {
          name: form.name.trim(),
          shopName: form.shopName.trim(),
          address: {
            addressLine: form.addressLine.trim(),
            city: form.city.trim(),
            district: form.district.trim(),
            state: form.state.trim(),
            pincode: form.pincode.trim(),
          },
        },
        checkoutToken
      );

      const customer = data.customer;
      const saved =
        customer?.addresses?.find((a) => a.isDefault) || customer?.addresses?.[0];

      if (!saved?._id) {
        throw new Error(
          "Customer saved, but address ID was not returned. Please check the registration API response."
        );
      }

      setAddressId(saved._id);
      await placeGuestOrder(saved._id);
    } catch (err) {
      setError(errorMessage(err, "Unable to register customer."));
    } finally {
      setBusy(false);
    }
  };

  const submitGuestCheckout = async () => {
    if (!validateAddress()) return;

    if (!checkoutToken) return setError("Please verify your email first.");

    if (customerType === "existing_guest") {
      if (useNewAddress) {
        return setError(
          "Adding a new address for an existing guest requires a separate address-save API. Please select an existing saved address."
        );
      }
      if (!addressId) return setError("Please select a saved delivery address.");
      return placeGuestOrder(addressId);
    }

    return registerGuest();
  };

  return {
    open, step, setStep, busy, error,
    form, updateForm,
    customerType, guestAddresses, addressId, useNewAddress,
    openCheckout, closeCheckout,
    sendOtp, verifyOtp, selectAddress, submitGuestCheckout,
  };
}