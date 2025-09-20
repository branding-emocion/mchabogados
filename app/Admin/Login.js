// export default Login;
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
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [inputValue, setInputValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

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
        errorCode == "auth/invalid-email" ||
        errorCode == "auth/wrong-password" ||
        errorCode == "auth/invalid-credential"
      ) {
        toast("Usuario o contraseña incorrectos");
      } else {
        toast("Error al intentar ingresar al sistema");
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

              <div className="relative">
                <input
                  onChange={handlerChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="text-sm text-gray-800 px-4 py-3 pr-12 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-[#004f51]"
                  name="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
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
                <div className="relative mt-1">
                  <input
                    id="password"
                    className="w-full text-sm px-4 py-3 pr-12 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-[#004f51]"
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    onChange={handleRegisterChange}
                    name="password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterPassword(!showRegisterPassword)
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showRegisterPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
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
