import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from './ui/input'


function FilterJob({filters,onFilterChange  }) {
  return (
    <div>
      <h1 className='font-bold text-lg'>Filter Job</h1>
      <hr className='mt-3' />
      {/* <RadioGroup>

        {
          filterData.map((data, index) => (
            <div className='w-full bg-white rounded-md'>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, index) => {
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} />
                      <Label>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup> */}
       <div  className='w-20% flex flex-col gap-8'>
            
            <div>

            <h2 className='font-bold   text-lg'>Job Location</h2>
            {/* Location Filter */}
            <Input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => onFilterChange("location", e.target.value)}
            />

                </div>
            {/* Job Type Filter */}
            <div>

              <h2 className='font-bold  text-lg'>Job Type</h2>
            <select
                value={filters.jobType}
                onChange={(e) => onFilterChange("jobType", e.target.value)}
                >
                <option value="">All Job Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Remote">Remote</option>
            </select>
              </div>

            {/* Salary Range Filter */}
            <div className='flex flex-col '>
            <Input
              className="text-red-600 bg-slate-700"
                type="range"
                min="0"
                max="200000"
                step="2000"
                value={filters.salaryRange[1]}
                onChange={(e) =>
                  onFilterChange("salaryRange", [filters.salaryRange[0], parseInt(e.target.value)])
                }
                />
            <span className='font-semibold'>Up to: {filters.salaryRange[1]}</span>
                </div>

           
            {/* <button
                className="mt-2 bg-blue-500 text-white p-2 rounded"
                onClick={onSaveFilters}
            >
                Save Filters
            </button> */}

        </div>
    </div>
  )
}

export default FilterJob