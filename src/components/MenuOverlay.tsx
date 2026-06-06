import { X, Camera, Image, FileText, ToggleRight, ChevronRight, BookOpen, Settings, Zap, Database } from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  board: string;
  setBoard: (val: string) => void;
  level: string;
  setLevel: (val: string) => void;
  subject: string;
  setSubject: (val: string) => void;
  unit: string;
  setUnit: (val: string) => void;
  boardOpts: { value: string; label: string }[];
  levelOpts: { value: string; label: string }[];
  subjectOpts: { value: string; label: string }[];
  unitOpts: { value: string; label: string }[];
  autoOpen: boolean;
  setAutoOpen: (val: boolean) => void;
  setSelectedTopics: (val: string[]) => void;
}

const MenuOverlay = ({
  isOpen,
  onClose,
  board,
  setBoard,
  level,
  setLevel,
  subject,
  setSubject,
  unit,
  setUnit,
  boardOpts,
  levelOpts,
  subjectOpts,
  unitOpts,
  autoOpen,
  setAutoOpen,
  setSelectedTopics,
}: MenuOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 flex flex-col p-6 text-white">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-semibold">Search Filters</h2>
        <div className="w-10" />
      </div>

      {/* Quick Action Buttons (Placeholder for Camera/Photos/Files look) */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: Camera, label: "Camera" },
          { icon: Image, label: "Photos" },
          { icon: FileText, label: "Files" },
        ].map((item) => (
          <button
            key={item.label}
            className="flex flex-col items-center justify-center gap-3 p-4 bg-neutral-800 rounded-2xl border border-neutral-700 hover:bg-neutral-700 transition"
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Web Search Toggle */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-800 mb-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-neutral-800 rounded-lg">
            <Zap className="w-5 h-5" />
          </div>
          <span>I'm Feeling Lucky</span>
        </div>
        <button onClick={() => setAutoOpen(!autoOpen)}>
          <ToggleRight className={`w-10 h-6 ${autoOpen ? "text-[var(--primary)]" : "text-neutral-600"}`} />
        </button>
      </div>

      {/* Dropdowns as Menu Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <BookOpen className="w-5 h-5 text-neutral-400" />
            <span>Board</span>
          </div>
          <div className="w-40">
            <CustomDropdown label="" value={board} onChange={setBoard} placeholder="Select" options={boardOpts} variant="tan" />
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <Settings className="w-5 h-5 text-neutral-400" />
            <span>Level</span>
          </div>
          <div className="w-40">
            <CustomDropdown label="" value={level} onChange={setLevel} placeholder="Select" options={levelOpts} variant="salmon" />
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <Database className="w-5 h-5 text-neutral-400" />
            <span>Subject</span>
          </div>
          <div className="w-40">
            <CustomDropdown
              label=""
              value={subject}
              onChange={(v) => {
                setSubject(v);
                setUnit("");
                setSelectedTopics([]);
              }}
              placeholder="Select"
              options={subjectOpts}
              variant="peach"
            />
          </div>
        </div>
        {subject && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-4">
              <ChevronRight className="w-5 h-5 text-neutral-400" />
              <span>Unit</span>
            </div>
            <div className="w-40">
              <CustomDropdown label="" value={unit} onChange={setUnit} placeholder="Select" options={unitOpts} variant="brown" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuOverlay;
