"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Activity } from '@prisma/client'
import { ArrowRight, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteActivity, updateActivity } from "./actions"
import { useState, useEffect } from 'react'
import { ActivityItemRow } from "./activity-item-row";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const columns: ColumnDef<any>[] = [
	{
		id: 'name',
		accessorKey: "Activity Name",
		header: "Activity Name",
		cell: ({ row }) => (
			<div>
				{row.original.name}
			</div>
		),
	},

	{
		id: "date",
		accessorKey: "Date",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			)
		},
		cell: ({ row }) => (
			<div className="flex border-border gap-2 grow" >
				<span >
					{new Intl.DateTimeFormat(undefined, {
						hour: 'numeric',
						minute: 'numeric'
					}).format(row.original.startAt)}
				</span>
				<ArrowRight />
				<span className="">
					{new Intl.DateTimeFormat('en-US', {
						hour: 'numeric',
						minute: 'numeric'
					}).format(row.original.endAt || new Date())}
				</span>
			</div>
		),
	},

	{
		id: 'Clients',
		accessorKey: 'Clients',
		header: () => <div className="text-left">Clients</div>,
		cell: ({ row }) => {
			// console.log(row.getValue('name'))


			const { client } = row.original
			// 	.find(
			// 	(item: any) => item.name === row.getValue("name")
			// )


			return (
				<>
					{client && client.name ? (
						<div>{client.name}</div>
					) : (<div>-</div>)}
				</>
			)
		}
	},
	{
		id: 'Project',
		accessorKey: 'Project',
		header: 'Project',
		cell: ({ row }) => {
			const project = row.original
			return (
				<>
					{project.name ? (
						<div>{project.name}</div>
					) : (<div>-</div>)}
				</>
			)
		}
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const [isEditing, setIsEditing] = useState(false)
			const edit = () => {
				setIsEditing(prev => !prev)

			}
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						<DropdownMenuLabel >Actions</DropdownMenuLabel>

						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Button
								onClick={edit}
								variant='outline'>Edit</Button>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Button onClick={async () => deleteActivity(row.original.id)}
								variant='destructive'>Delete</Button>

						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu >
			)
		}

	}
]
