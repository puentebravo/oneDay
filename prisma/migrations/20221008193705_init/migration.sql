-- CreateTable
CREATE TABLE "SavedDates" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "weather" JSONB NOT NULL,
    "story" TEXT NOT NULL,
    "photoSrc" TEXT NOT NULL,

    CONSTRAINT "SavedDates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedDates_id_key" ON "SavedDates"("id");
