"use client";

import React from 'react';
import { Button } from "@heroui/react";
import Image from 'next/image'; 
import Link from 'next/link';   
import {FaTrashAlt,  FaCheck, FaExclamationTriangle, FaBug, FaCopyright, FaInfoCircle} from 'react-icons/fa';

export default function ReportsContainer({ initialReports }) {

  const handleRemoveRecipe = (recipeId, reportId) => {
    console.log("Remove Recipe:", recipeId, "Report:", reportId);
  };

  const handleDismissReport = (reportId) => {
    console.log("Dismiss Report:", reportId);
  };

  const getReasonStyles = (reason) => {
    const normalizedReason = reason?.toLowerCase() || "";

    if (normalizedReason.includes("offensive") || normalizedReason.includes("hate") || normalizedReason.includes("bad")) {
      return {
        badgeClass: "bg-red-50 text-red-600 border border-red-100",
        icon: <FaExclamationTriangle className="text-red-500" />
      };
    }
    if (normalizedReason.includes("copyright") || normalizedReason.includes("plagiarism") || normalizedReason.includes("steal")) {
      return {
        badgeClass: "bg-orange-50 text-orange-600 border border-orange-100",
        icon: <FaCopyright className="text-orange-500" />
      };
    }
    if (normalizedReason.includes("spam") || normalizedReason.includes("fake") || normalizedReason.includes("ad")) {
      return {
        badgeClass: "bg-amber-50 text-amber-600 border border-amber-100",
        icon: <FaBug className="text-amber-500" />
      };
    }
    return {
      badgeClass: "bg-zinc-50 text-zinc-600 border border-zinc-200",
      icon: <FaInfoCircle className="text-zinc-400" />
    };
  };

  if (!initialReports || initialReports.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-zinc-200 shadow-sm">
        <p className="text-zinc-500 font-medium">No reports available to review.</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block overflow-hidden bg-white text-zinc-900 rounded-2xl shadow-sm border border-zinc-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 text-zinc-500 text-xs uppercase font-bold border-b border-zinc-200">
                <th className="p-4">Recipe</th>
                <th className="p-4">Reporter</th>
                <th className="p-4">Reason</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {initialReports.map((report) => {
                const { badgeClass, icon } = getReasonStyles(report.reason);

                return (
                  <tr key={report._id} className="hover:bg-zinc-50/70 transition-colors">
                    
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Link href={`/recipes/${report.recipeId}`} className="relative w-12 h-12 rounded-xl overflow-hidden border border-zinc-100 shadow-sm flex-shrink-0 block hover:opacity-80 transition-opacity">
                          <Image 
                            src={report.recipeImage} 
                            alt={report.recipeName} 
                            fill
                            sizes="48px"
                            className="object-cover"
                            priority={false}
                          />
                        </Link>
                        <div className="flex flex-col">
                          <Link href={`/recipes/${report.recipeId}`} className="font-bold text-zinc-800 text-sm hover:text-rose-600 transition-colors">
                            {report.recipeName}
                          </Link>
                          <span className="capitalize text-zinc-400 text-xs mt-0.5">{report.category}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-zinc-800 text-sm">{report.reporterName}</span>
                        <span className="text-zinc-400 text-xs mt-0.5">{report.reporterEmail}</span>
                      </div>
                    </td>
                    
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${badgeClass}`}>
                        {icon}
                        {report.reason}
                      </span>
                    </td>
                    
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2.5">
                        <Button
                          size="sm"
                          variant="solid"
                          startContent={<FaTrashAlt size={12} />}
                          onPress={() => handleRemoveRecipe(report.recipeId, report._id)}
                          className="font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm"
                        >
                          Remove Recipe
                        </Button>
                        <Button
                          size="sm"
                          variant="solid"
                          startContent={<FaCheck size={12} />}
                          onPress={() => handleDismissReport(report._id)}
                          className="font-bold bg-zinc-200 hover:bg-zinc-300 text-zinc-800 shadow-sm border border-zinc-300/50"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
        {initialReports.map((report) => {
          const { badgeClass, icon } = getReasonStyles(report.reason);

          return (
            <div 
              key={report._id} 
              className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between gap-4"
            >
              <div className="flex gap-3">
                <Link href={`/recipes/${report.recipeId}`} className="relative w-16 h-16 rounded-xl overflow-hidden border border-zinc-100 shadow-sm flex-shrink-0 block">
                  <Image 
                    src={report.recipeImage} 
                    alt={report.recipeName} 
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-col min-w-0">
                  <Link href={`/recipes/${report.recipeId}`} className="font-bold text-zinc-800 text-base truncate hover:text-rose-600 transition-colors">
                    {report.recipeName}
                  </Link>
                  <span className="text-zinc-400 text-xs capitalize mb-1">{report.category}</span>
                  <span className="text-zinc-500 text-xs truncate">By: {report.reporterEmail}</span>
                </div>
              </div>

              <div className={`p-3 rounded-xl ${badgeClass}`}>
                <span className="text-xs font-black  mb-1 flex items-center gap-1.5">
                  {icon} REASON FOR REPORT:
                </span>
                <p className="text-xs font-semibold opacity-90">{report.reason}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button
                  size="sm"
                  variant="solid"
                  startContent={<FaTrashAlt size={11} />}
                  onPress={() => handleRemoveRecipe(report.recipeId, report._id)}
                  className="w-full font-bold text-xs bg-red-600 hover:bg-red-700 text-white shadow-sm"
                >
                  Remove
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  startContent={<FaCheck size={11} />}
                  onPress={() => handleDismissReport(report._id)}
                  className="w-full font-bold text-xs bg-zinc-200 hover:bg-zinc-300 text-zinc-800 border border-zinc-300 shadow-sm"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}