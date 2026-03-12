import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Phone, Loader2, CheckCircle2, XCircle, ChevronRight, Coins } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const suggestedAmounts = [
  { amount: 500, label: "School supplies" },
  { amount: 1000, label: "Meals for a family" },
  { amount: 2500, label: "Medical support" },
  { amount: 5000, label: "Sponsor education" },
  { amount: 10000, label: "Fund a workshop" },
  { amount: 25000, label: "Transform community" },
];

type PaymentState = "form" | "processing" | "success" | "failed";
type AmountMode = "suggested" | "custom";

interface DonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  causeSlug: string;
  causeTitle: string;
}

const DonationDialog = ({ open, onOpenChange, causeSlug, causeTitle }: DonationDialogProps) => {
  const [amountMode, setAmountMode] = useState<AmountMode>("suggested");
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentState, setPaymentState] = useState<PaymentState>("form");
  const [receipt, setReceipt] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const donationAmount = amountMode === "custom" ? parseInt(customAmount) : selectedAmount;

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const resetForm = () => {
    setPaymentState("form");
    setReceipt(null);
    setName("");
    setEmail("");
    setPhone("");
    setCustomAmount("");
    setSelectedAmount(1000);
    setAmountMode("suggested");
    if (pollingRef.current) clearInterval(pollingRef.current);
  };

  const handleDonate = async () => {
    if (!name || !email || !phone || !donationAmount) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    setPaymentState("processing");

    try {
      const { data, error } = await supabase.functions.invoke("mpesa-stk-push", {
        body: { name, email, phone, amount: donationAmount, cause_slug: causeSlug },
      });

      if (error || !data?.checkout_request_id) {
        throw new Error(data?.error || "Failed to initiate payment");
      }

      const checkoutId = data.checkout_request_id;

      let attempts = 0;
      pollingRef.current = setInterval(async () => {
        attempts++;
        if (attempts > 40) {
          clearInterval(pollingRef.current!);
          setPaymentState("failed");
          return;
        }

        try {
          const { data: statusData } = await supabase.functions.invoke("check-donation-status", {
            body: { checkout_request_id: checkoutId },
          });

          if (statusData?.status === "completed") {
            clearInterval(pollingRef.current!);
            setReceipt(statusData.receipt);
            setPaymentState("success");
          } else if (statusData?.status === "failed") {
            clearInterval(pollingRef.current!);
            setPaymentState("failed");
          }
        } catch {
          // Continue polling
        }
      }, 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Payment initiation failed";
      toast({ title: "Error", description: message, variant: "destructive" });
      setPaymentState("form");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) resetForm(); onOpenChange(o); }}>
      <DialogContent className="w-[95%] sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <div className="bg-primary px-4 sm:px-6 py-6 sm:py-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-secondary fill-secondary" />
              </div>
              <DialogTitle className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                Support our mission
              </DialogTitle>
            </div>
            <DialogDescription className="text-primary-foreground/70 text-sm sm:text-base leading-snug">
              Your contribution to <span className="text-secondary font-semibold">{causeTitle}</span> creates lasting impact.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-4 sm:p-6 bg-card max-h-[calc(100vh-200px)] overflow-y-auto">
          {paymentState === "form" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Amount Selection Type */}
              <div className="flex p-1 bg-muted rounded-xl gap-1">
                <button
                  onClick={() => setAmountMode("suggested")}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                    amountMode === "suggested" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Give Suggested
                </button>
                <button
                  onClick={() => setAmountMode("custom")}
                  className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                    amountMode === "custom" ? "bg-white shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Custom Amount
                </button>
              </div>

              <AnimatePresence mode="wait">
                {amountMode === "suggested" ? (
                  <motion.div
                    key="suggested"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-2 gap-2 sm:gap-3"
                  >
                    {suggestedAmounts.map((item) => (
                      <button
                        key={item.amount}
                        onClick={() => setSelectedAmount(item.amount)}
                        className={`p-2 sm:p-4 rounded-xl text-left transition-all border-2 relative group overflow-hidden ${
                          selectedAmount === item.amount
                            ? "border-secondary bg-secondary/5 ring-4 ring-secondary/10"
                            : "border-border hover:border-secondary/30 bg-muted/30"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-display font-extrabold text-base sm:text-lg text-foreground">
                            {item.amount.toLocaleString()}
                          </span>
                          {selectedAmount === item.amount && (
                            <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                            </div>
                          )}
                        </div>
                        <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-muted-foreground group-hover:text-secondary transition-colors line-clamp-2">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="custom"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="custom-amount" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Enter Amount (KES)
                    </Label>
                    <div className="relative">
                      <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="e.g. 5000"
                        className="pl-12 h-12 sm:h-14 text-lg sm:text-xl font-bold rounded-xl border-2 focus-visible:ring-secondary focus-visible:border-secondary"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-border/50">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="donor-name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                    <Input
                      id="donor-name"
                      placeholder="Enter your name"
                      className="h-10 sm:h-12 rounded-xl bg-muted/20 border-border/50 text-sm sm:text-base"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="donor-email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                      <Input
                        id="donor-email"
                        type="email"
                        placeholder="your@email.com"
                        className="h-10 sm:h-12 rounded-xl bg-muted/20 border-border/50 text-sm sm:text-base"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="donor-phone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">M-Pesa Number</Label>
                      <Input
                        id="donor-phone"
                        type="tel"
                        placeholder="07XXXXXXXX"
                        className="h-10 sm:h-12 rounded-xl bg-muted/20 border-border/50 text-sm sm:text-base"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleDonate}
                className="w-full h-12 sm:h-14 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base sm:text-lg rounded-2xl shadow-lg shadow-secondary/20 transition-all active:scale-[0.98] group"
                disabled={!donationAmount || donationAmount < 1}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>Donate KES {donationAmount?.toLocaleString() || "0"}</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>

              <p className="text-[9px] sm:text-[10px] text-center text-muted-foreground/80 uppercase tracking-[0.2em]">
                Secure payment powered by M-Pesa
              </p>
            </div>
          )}

          {paymentState === "processing" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 sm:py-12 text-center space-y-4 sm:space-y-6"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-secondary/20 rounded-full animate-ping" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-secondary" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">Check your phone</h3>
                <p className="text-muted-foreground text-sm sm:text-base max-w-[280px] mx-auto">
                  We've sent an M-Pesa STK push to <span className="font-bold text-foreground">{phone}</span>.
                </p>
              </div>
              <div className="bg-muted/50 p-3 sm:p-4 rounded-xl flex items-center justify-center gap-3 border border-border/50">
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-secondary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-foreground uppercase tracking-widest">Waiting for PIN entry...</span>
              </div>
            </motion.div>
          )}

          {paymentState === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 sm:py-12 text-center space-y-4 sm:space-y-6"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-9 h-9 sm:w-12 sm:h-12 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">Asante sana!</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Your donation of <span className="font-bold text-foreground">KES {donationAmount?.toLocaleString()}</span> has been received.
                </p>
              </div>
              {receipt && (
                <div className="inline-block px-3 sm:px-4 py-2 bg-muted rounded-lg font-mono text-xs sm:text-sm border border-border overflow-x-auto">
                  Ref: <span className="font-bold">{receipt}</span>
                </div>
              )}
              <div className="pt-4">
                <Button onClick={() => { resetForm(); onOpenChange(false); }} className="rounded-xl w-full h-10 sm:h-12 bg-primary font-bold text-sm sm:text-base">
                  Continue supporting
                </Button>
              </div>
            </motion.div>
          )}

          {paymentState === "failed" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 sm:py-12 text-center space-y-4 sm:space-y-6"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <XCircle className="w-9 h-9 sm:w-12 sm:h-12 text-destructive" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">Transaction Failed</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  We couldn't process your payment. Please try again.
                </p>
              </div>
              <div className="pt-4 space-y-2 sm:space-y-3">
                <Button onClick={resetForm} className="rounded-xl w-full h-10 sm:h-12 bg-secondary text-secondary-foreground font-bold text-sm sm:text-base">
                  Try Again
                </Button>
                <Button onClick={() => onOpenChange(false)} variant="ghost" className="w-full text-muted-foreground font-bold text-sm sm:text-base">
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
