import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "~/modules/layout/page-layout";
import {
  Button,
  ConfirmDialog,
  Input,
  PageHeaderWithBack,
  QueryState,
} from "~/modules/shared";
import {
  isReportClosed,
  isReportUnderReview,
  useAddReportNote,
  useChangeReportStatus,
  useGetReportDetails,
} from "~/hooks/queries/report/report";
import type { ReportStatusValue } from "~/hooks/queries/report/report.type";
import { toast } from "sonner";
import ProfileInfo from "~/modules/shared/widgets/profile_info";
import type { SwapDetailsProps } from "~/types/base";
import {
  createImageErrorHandler,
  formatDateTime,
  getImageSrcWithFallback,
  getStatusStyles,
} from "~/modules/util";
import userFallback from "~/assets/images/user.png";
import { Download, Plus } from "lucide-react";

const getEvidenceFileName = (url: string, index: number) => {
  try {
    const pathname = new URL(url, window.location.origin).pathname;
    const base = pathname.split("/").pop();
    if (base) return base;
  } catch {
    // ignore invalid URLs
  }

  return `evidence-${index + 1}`;
};

const downloadEvidenceFile = async (
  url: string,
  filename: string,
) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

const toPersonProfile = (
  name: string,
  img: string | null | undefined,
  userId: string,
  rating?: string,
  totalSwap?: string,
): SwapDetailsProps => ({
  listingId: "",
  name: "",
  condition: "",
  price: 0,
  itemUrl: "",
  category: "",
  status: "",
  description: "",
  location: "",
  dateListed: "",
  datePosted: "",
  edited: "",
  requestedInExchange: [],
  owner: name || "—",
  ownerAvatar: img || "",
  ownerId: userId,
  rating: rating ?? "—",
  swap: { total: totalSwap ?? "—" },
});

const formatReportStatus = (status?: string) => {
  if (!status) return "New";
  if (status === "UnderReview") return "Under Review";
  return status;
};

const normalizeReportStatus = (status?: string) =>
  status?.trim().toLowerCase().replace(/\s+/g, "") ?? "";

const isSameReportStatus = (
  current: string | undefined,
  target: ReportStatusValue,
) => normalizeReportStatus(current) === target.toLowerCase();

type ReportModalAction = "addNote" | "updateStatus" | null;

const STATUS_OPTIONS: { label: string; value: ReportStatusValue }[] = [
  { label: "Under Review", value: "UnderReview" },
  { label: "Resolved", value: "Resolved" },
  { label: "Dismissed", value: "Dismissed" },
];

const EvidenceItem = ({ url, index }: { url: string; index: number }) => {
  const [imageError, setImageError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const alt = `Evidence ${index + 1}`;

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      await downloadEvidenceFile(url, getEvidenceFileName(url, index));
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Box
      w="160px"
      flexShrink={0}
      borderRadius="8px"
      overflow="hidden"
      border="1px solid #E9E9E9"
      bg="#fff"
    >
      <Box h="140px" w="100%">
        <Image
          width="100%"
          height="100%"
          objectFit="cover"
          src={getImageSrcWithFallback(
            url,
            imageError || !url.trim(),
            userFallback,
          )}
          alt={alt}
          onError={createImageErrorHandler(setImageError)}
        />
      </Box>
      <Box borderTop="1px solid #E9E9E9">
          <Button
            width="100%"
            bg="#F7F7F7"
            handleClick={handleDownload}
            isDisabled={isDownloading}
            loading={isDownloading}
          >
            <Flex align="center" justify="center" gap={2} py={1}>
              <Download size={14} color="#222222" />
              <Text color="#222222" fontSize="13px" fontWeight={500}>
                Download
              </Text>
            </Flex>
          </Button>
        </Box>
    </Box>
  );
};

const SectionCard = ({
  title,
  rightSlot,
  children,
}: {
  title: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Box
    bg="#F7F7F7"
    w="100%"
    p={4}
    border="1px solid #E9E9E9"
    borderRadius="md"
    mt={5}
  >
    <Flex
      align="center"
      justify="space-between"
      gap={4}
      mb={3}
      flexWrap="wrap"
    >
      <Text fontWeight={500} color="#222222">
        {title}
      </Text>
      {rightSlot}
    </Flex>
    {children}
  </Box>
);

export const FlagReportDetails = () => {
  const { reportId = "" } = useParams<{ reportId: string }>();
  const [noteDraft, setNoteDraft] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ReportStatusValue | "">(
    "",
  );
  const [modalAction, setModalAction] = useState<ReportModalAction>(null);

  const {
    data: report,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetReportDetails({
    reportId,
    enabler: !!reportId,
  });

  const closeActionModal = () => {
    setModalAction(null);
    setNoteDraft("");
    setSelectedStatus("");
  };

  const { mutate: addNote, isPending: isAddingNote } = useAddReportNote({
    onSuccess: (res: { displayMessage?: string }) => {
      toast.success(res?.displayMessage || "Note added");
      closeActionModal();
    },
    onError: (msg) => toast.error(msg),
  });

  const { mutate: changeStatus, isPending: isChangingStatus } =
    useChangeReportStatus({
      onSuccess: (res: { displayMessage?: string }) => {
        toast.success(res?.displayMessage || "Report status updated");
        closeActionModal();
      },
      onError: (msg) => toast.error(msg),
    });

  const handleModalConfirm = () => {
    if (!modalAction || !reportId) return;

    if (modalAction === "addNote") {
      const note = noteDraft.trim();
      if (!note) return;
      addNote({ note, reportId });
      return;
    }

    if (modalAction === "updateStatus" && selectedStatus) {
      changeStatus({ reportId, status: selectedStatus });
    }
  };

  const statusStyles = getStatusStyles(
    formatReportStatus(report?.status).toLowerCase(),
  );
  const notes = report?.notes ?? [];
  const evidence = (report?.evidenceImg ?? []).filter((url) => url?.trim());
  const reportIsClosed = isReportClosed(report?.status);
  const canAddNote = isReportUnderReview(report?.status);

  const availableStatusOptions = STATUS_OPTIONS.filter(
    (option) => !isSameReportStatus(report?.status, option.value),
  );

  const openAddNoteModal = () => setModalAction("addNote");

  const openStatusModal = () => {
    setSelectedStatus(availableStatusOptions[0]?.value ?? "");
    setModalAction("updateStatus");
  };

  const isModalSubmitting = isAddingNote || isChangingStatus;
  const isConfirmDisabled =
    modalAction === "addNote"
      ? !noteDraft.trim()
      : modalAction === "updateStatus"
        ? !selectedStatus
        : true;

  return (
    <PageLayout>
      <QueryState
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
        onRetry={() => refetch()}
        isEmpty={!reportId || (!isLoading && !isFetching && !report)}
        emptyProps={{
          title: "Report not found",
          description: "Select a report from the list to view its details.",
        }}
        errorProps={{
          title: "Could not load report",
          description: "We had trouble fetching this report. Please try again.",
        }}
      >
        {report && (
          <Box pb={8}>
            <PageHeaderWithBack
              title="Report Details"
              description={`${report.reportType} report filed by ${report.reporterName}`}
              backLabel="Back to reports"
            />

            <Flex gap={3} align="center" flexWrap="wrap" mb={2}>
              <Text
                border="1px solid #E9E9E9"
                bg="#fff"
                color="#222222"
                py="5px"
                px="12px"
                borderRadius="37.74px"
                fontSize="13px"
                fontWeight={500}
              >
                {report.reportType}
              </Text>
              <Text
                border="1px solid"
                borderColor={statusStyles.borderColor}
                bg={statusStyles.bg}
                color={statusStyles.textColor}
                py="5px"
                px="12px"
                borderRadius="37.74px"
                fontSize="13px"
                fontWeight={500}
              >
                {formatReportStatus(report.status)}
              </Text>
              <Text fontSize="sm" color="#737373">
                Reported {formatDateTime(report.created)}
              </Text>
            </Flex>

            <Text fontSize="sm" color="#737373" mb={3}>
              Report ID: {report.reportId}
            </Text>

            {(canAddNote || (!reportIsClosed && availableStatusOptions.length > 0)) && (
              <Flex gap={3} mb={5} flexWrap="wrap">
                {canAddNote && (
                  <Button
                    bg="#222222"
                    width="fit-content"
                    handleClick={openAddNoteModal}
                  >
                    <Flex align="center" gap={2}>
                      <Plus size={16} color="#fff" />
                      <Text color="#fff">Add note</Text>
                    </Flex>
                  </Button>
                )}
                {!reportIsClosed && availableStatusOptions.length > 0 && (
                  <Button
                    bg="#222222"
                    width="fit-content"
                    handleClick={openStatusModal}
                  >
                    <Text color="#fff">Update status</Text>
                  </Button>
                )}
              </Flex>
            )}

            <SectionCard title="Reporter">
              <ProfileInfo
                detail={toPersonProfile(
                  report.reporterName,
                  report.reporterImg,
                  report.reporterId,
                )}
                showStats={false}
              />
            </SectionCard>

            <SectionCard title="Reported Person">
              <ProfileInfo
                detail={toPersonProfile(
                  report.reportedPersonName,
                  report.reportedPersonImg,
                  report.reportedPersonId,
                  report.reportedPersonRating,
                  report.reportedPersonTotalSwap,
                )}
              />
            </SectionCard>

            <SectionCard title="Report Reason">
              <Box
                bg="#fff"
                border="1px solid #E9E9E9"
                borderRadius="md"
                p={4}
              >
                <Text color="#222222" whiteSpace="pre-wrap">
                  {report.reason || "—"}
                </Text>
              </Box>
            </SectionCard>

            <SectionCard
              title="Admin Notes"
              rightSlot={
                <Text fontSize="sm" color="#737373">
                  {notes.length} note{notes.length === 1 ? "" : "s"}
                </Text>
              }
            >
              <Box
                bg="#fff"
                border="1px solid #E9E9E9"
                borderRadius="md"
                p={4}
                maxH="320px"
                overflowY="auto"
                display="flex"
                flexDirection="column"
                gap={3}
              >
                {notes.length > 0 ? (
                  notes.map((note, index) => (
                    <Box
                      key={`${index}-${note.slice(0, 24)}`}
                      borderBottom={
                        index < notes.length - 1 ? "1px solid #F0F0F0" : undefined
                      }
                      pb={index < notes.length - 1 ? 3 : 0}
                    >
                      <Text fontSize="xs" color="#737373" mb={1}>
                        Note {index + 1}
                      </Text>
                      <Text color="#222222" whiteSpace="pre-wrap">
                        {note}
                      </Text>
                    </Box>
                  ))
                ) : (
                  <Text color="#737373">No admin notes yet.</Text>
                )}
              </Box>
            </SectionCard>

            <SectionCard
              title="Evidence"
              rightSlot={
                <Text fontSize="sm" color="#737373">
                  {evidence.length} file{evidence.length === 1 ? "" : "s"}
                </Text>
              }
            >
              {evidence.length > 0 ? (
                <Flex gap={4} flexWrap="wrap">
                  {evidence.map((url, index) => (
                    <EvidenceItem key={`${url}-${index}`} url={url} index={index} />
                  ))}
                </Flex>
              ) : (
                <Box
                  bg="#fff"
                  border="1px solid #E9E9E9"
                  borderRadius="md"
                  p={4}
                >
                  <Text color="#737373">No evidence uploaded.</Text>
                </Box>
              )}
            </SectionCard>
          </Box>
        )}
      </QueryState>

      <ConfirmDialog
        open={modalAction !== null}
        onClose={closeActionModal}
        title={modalAction === "addNote" ? "Add admin note" : "Update status"}
        confirmLabel={modalAction === "addNote" ? "Add note" : "Update status"}
        onConfirm={handleModalConfirm}
        isLoading={isModalSubmitting}
        confirmDisabled={isConfirmDisabled}
      >
        {modalAction === "addNote" ? (
          <Input
            type="textarea"
            name="adminNote"
            handleChange={(e) => setNoteDraft(e.target.value)}
            placeholder="Write an admin note..."
            value={noteDraft}
            resize="vertical"
          />
        ) : modalAction === "updateStatus" ? (
          <Box>
            <Text fontSize="14px" fontWeight={500} color="#101928" mb={2}>
              Status
            </Text>
            <select
              name="reportStatus"
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as ReportStatusValue)
              }
              style={{
                width: "100%",
                height: "44px",
                padding: "0 12px",
                border: "1px solid #E9E9E9",
                borderRadius: "8px",
                background: "#fff",
                color: "#222222",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              <option value="" disabled>
                Select status
              </option>
              {availableStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Box>
        ) : null}
      </ConfirmDialog>
    </PageLayout>
  );
};
