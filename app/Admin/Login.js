"use client";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "@/firebase/firebaseClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [inputValue, setInputValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerData, setRegisterData] = useState({});

  const googleProvider = new GoogleAuthProvider();

  const saveUserToFirestore = async (user, additionalData = {}) => {
    try {
      const userRef = doc(db, "Usuarios", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || registerData?.nombre || "",
          photoURL: user.photoURL || "",
          nombre: registerData?.nombre || "",
          telefono: registerData?.telefono || "",
          direccion: registerData?.direccion || "",
          fechaNacimiento: registerData?.fechaNacimiento || "",
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          ...additionalData,
        });
      } else {
        await setDoc(
          userRef,
          {
            lastLogin: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error("Error saving user to Firestore:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputValue?.Usuario,
        inputValue?.Password
      );
      await saveUserToFirestore(userCredential.user);
      console.log("User:", userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      console.log("error", error);

      if (
        errorCode === "auth/invalid-email" ||
        errorCode === "auth/wrong-password" ||
        errorCode === "auth/invalid-credential"
      ) {
        alert("Usuario o contraseña incorrectos");
      } else {
        alert("Error al intentar ingresar al sistema");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerData?.email,
        registerData?.password
      );
      await saveUserToFirestore(userCredential.user, {
        registrationMethod: "email",
      });
      alert("Cliente registrado exitosamente");
      setShowRegisterModal(false);
      setRegisterData({});
    } catch (error) {
      const errorCode = error.code;
      console.log("error", error);

      if (errorCode === "auth/email-already-in-use") {
        alert("Este email ya está registrado");
      } else if (errorCode === "auth/weak-password") {
        alert("La contraseña debe tener al menos 6 caracteres");
      } else {
        alert("Error al crear la cuenta");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToFirestore(result.user, { registrationMethod: "google" });
      console.log("Google sign-in successful:", result.user);
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert("Error al iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  const handlerChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="absolute top-0 left-0 bg-gradient-to-b from-[#034fc2] to-[#171717] bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex justify-center self-center z-10">
          <form
            onSubmit={handleLogin}
            className="p-12 bg-white mx-auto rounded-3xl w-96"
          >
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">
                Iniciar sesión
              </h3>
              <p className="text-gray-600 text-sm mt-2">Ingresa a tu cuenta</p>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#004f51]"
                  type="email"
                  placeholder="Email"
                  onChange={handlerChange}
                  name="Usuario"
                  required
                />
              </div>

              <div>
                <input
                  onChange={handlerChange}
                  type="password"
                  placeholder="Contraseña"
                  className="text-sm text-gray-800 px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-[#004f51]"
                  name="Password"
                  required
                />
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#004f51] hover:bg-[#131b2c] text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                >
                  {loading ? "Procesando..." : "Iniciar sesión"}
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <div className="border-t border-gray-300 flex-grow mr-3"></div>
                <span className="text-gray-500 text-sm">o</span>
                <div className="border-t border-gray-300 flex-grow ml-3"></div>
              </div>

              <div>
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500 flex items-center justify-center gap-2 bg-transparent"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23s.43 3.45 1.18 4.93l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continuar con Google
                </Button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(true)}
                  className="text-[#004f51] hover:underline text-sm"
                >
                  ¿No tienes cuenta? Regístrate
                </button>
              </div>
            </div>

            <div className="mt-7 text-center text-xs">
              <span>
                Copyright © {new Date().getFullYear()}-
                {new Date().getFullYear() + 1}{" "}
                <Link className="text-[#004f51]" href="/">
                  mchabogados
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-2xl text-gray-800">
                Crear cuenta
              </h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCompleteRegistration} className="space-y-4">
              <div>
                <Label
                  htmlFor="nombre"
                  className="text-sm font-medium text-gray-700"
                >
                  Nombre completo *
                </Label>
                <input
                  id="nombre"
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#004f51] mt-1"
                  type="text"
                  placeholder="Ingresa tu nombre completo"
                  onChange={handleRegisterChange}
                  name="nombre"
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email *
                </Label>
                <input
                  id="email"
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#004f51] mt-1"
                  type="email"
                  placeholder="Ingresa tu email"
                  onChange={handleRegisterChange}
                  name="email"
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Contraseña *
                </Label>
                <input
                  id="password"
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#004f51] mt-1"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  onChange={handleRegisterChange}
                  name="password"
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="telefono"
                  className="text-sm font-medium text-gray-700"
                >
                  Teléfono *
                </Label>
                <input
                  id="telefono"
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#004f51] mt-1"
                  type="tel"
                  placeholder="Ingresa tu número de teléfono"
                  onChange={handleRegisterChange}
                  name="telefono"
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="direccion"
                  className="text-sm font-medium text-gray-700"
                >
                  Dirección
                </Label>
                <input
                  id="direccion"
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#004f51] mt-1"
                  type="text"
                  placeholder="Ingresa tu dirección"
                  onChange={handleRegisterChange}
                  name="direccion"
                />
              </div>

              <div>
                <Label
                  htmlFor="fechaNacimiento"
                  className="text-sm font-medium text-gray-700"
                >
                  Fecha de nacimiento
                </Label>
                <input
                  id="fechaNacimiento"
                  className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#004f51] mt-1"
                  type="date"
                  onChange={handleRegisterChange}
                  name="fechaNacimiento"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#004f51] hover:bg-[#131b2c] text-white"
                >
                  {loading ? "Creando..." : "Crear cuenta"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
